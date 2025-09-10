import {
    formattedDate,
    formattedName,
    generateRandomColor,
    generateRandomId,
    getCurrentDateTime,
    renderElement
} from "../utils/helper.js";
import {data} from "../assets/data/data.js";
import {commentService} from "../services/commentService.js";

export const wishes = () => {
    const wishesContainer = document.querySelector('.wishes');
    if (!wishesContainer) return; // Ensure .wishes exists before continuing

    const form = wishesContainer.children[1]?.children[3];
    // console.log(wishesContainer.children[1].children);
    if (!form) return; // Ensure the form exists

    const [peopleComment, ___, containerComment] = wishesContainer.children[2].children;
    const buttonForm = form.children[10];
    const pageNumber = wishesContainer.querySelector('.page-number');
    const [prevButton, nextButton] = wishesContainer.querySelectorAll('.button-grup button');

    const listItemComment = (data) => {
        const name = formattedName(data.name);
        const newDate = formattedDate(data.date);
        let date = "";

        if (newDate.days < 1) {
            if (newDate.hours < 1) {
                date = `${newDate.minutes} minit yang lalu`;
            } else {
                date = `${newDate.hours} jam, ${newDate.minutes} minit yang lalu`;
            }
        } else {
            date = `${newDate.days} hari, ${newDate.hours} jam yang lalu`;
        }

        return `<li data-aos="zoom-in" data-aos-duration="1000">
                    <div style="background-color: ${data.color}">${data.name.charAt(0).toUpperCase()}</div>
                    <div>
                        <h4>${name}</h4>
                        <p>${date}</p>
                        <p style="line-height:1.2rem">${data.message}</p>
                    </div>
                </li>`;

        // return `<li data-aos="zoom-in" data-aos-duration="1000">
        //         <div style="background-color: ${data.color}">${data.name.charAt(0).toUpperCase()}</div>
        //         <div>
        //             <h4>${name}</h4>
        //             <p>${date} <br>${data.status}</p>
        //             <p>${data.message}</p>
        //         </div>
        //     </li>`;
    };

    let lengthComment = 0; // Initialize lengthComment

    const initialComment = async () => {
        containerComment.innerHTML = `<h1 style="font-size: 1rem; margin: auto">Loading...</h1>`;
        peopleComment.innerHTML = `<h3 style="font-size: 35px; font-family: var(--sacramento); font-weight: 400; margin-bottom: 20px;">Ucapan<h3>`;
        // peopleComment.textContent = `Ucapan`;
        pageNumber.textContent = '..';

        try {
            const response = await commentService.getComment();
            const {comment} = response;

            lengthComment = comment.length;
            comment.reverse();

            // peopleComment.textContent = comment.length > 0 ? `${comment.length} orang telah mengucapkan` : 'Belum ada yang mengucapkan';
            // peopleComment.textContent = '';
            // peopleComment.textContent = 'Ucapan';
            pageNumber.textContent = '1';

            renderElement(comment.slice(startIndex, endIndex), containerComment, listItemComment);
        } catch (error) {
            peopleComment.textContent = 'Error loading comments';
            console.error('Error loading comments:', error);
        }
    };
 
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        buttonForm.textContent = '.....';
    
        const phoneNumber = e.target.phone.value;
    
        // Check if the phone number starts with '+6'
        const formattedPhone = phoneNumber.startsWith('+6') ? phoneNumber : '+6' + phoneNumber;
    
        const comment = {
            id: generateRandomId(),
            name: e.target.name.value,
            phone: formattedPhone, // Use the formatted phone number
            status: e.target.status.value === 'y' ? 'Hadir' : 'Tidak Hadir',
            pax: e.target.status.value === 'y' ? e.target.pax.value : 0 ,
            message: e.target.message.value,
            date: getCurrentDateTime(),
            color: generateRandomColor(),
        };
    
    
        try {
            const response = await commentService.getComment();
            await commentService.addComment(comment);
    
            lengthComment = response.comment.length;

            // // Check if the message is not empty before adding it
            // if (comment.message.trim() === '') {
            //     console.log('Empty message, not adding comment.');
            //     return;  // Stop execution if message is empty
            // }

            if (comment.message.trim() === '') { return; }
            // peopleComment.textContent = `${++response.comment.length} orang telah mengucapkan`;
            // peopleComment.textContent = 'Ucapan';
            containerComment.insertAdjacentHTML('afterbegin', listItemComment(comment));
        } catch (error) {
            console.error('Error submitting comment:', error);
            buttonForm.textContent = 'Error, try again';
        } finally {
            buttonForm.textContent = 'Hantar';
            form.reset();
        }
    });
    
 
    let currentPage = 1;
    let itemsPerPage = 3;
    let startIndex = 0;
    let endIndex = itemsPerPage;

    const updatePageContent = async () => {
        containerComment.innerHTML = '<h1 style="font-size: 1rem; margin: auto">Loading...</h1>';
        pageNumber.textContent = '..';
        prevButton.disabled = true;
        nextButton.disabled = true;

        try {
            const response = await commentService.getComment();
            const {comment} = response;

            comment.reverse();

            renderElement(comment.slice(startIndex, endIndex), containerComment, listItemComment);
            pageNumber.textContent = currentPage.toString();
        } catch (error) {
            console.log('Error loading comments:', error);
        } finally {
            prevButton.disabled = false;
            nextButton.disabled = false;
        }
    };

    nextButton.addEventListener('click', async () => {
        if (endIndex < lengthComment) {
            currentPage++;
            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;
            await updatePageContent();
        }
    });

    prevButton.addEventListener('click', async () => {
        if (currentPage > 1) {
            currentPage--;
            startIndex = (currentPage - 1) * itemsPerPage;
            endIndex = startIndex + itemsPerPage;
            await updatePageContent();
        }
    });

    if (!form) return; // Ensure the form exists
    const statusSelect = form.querySelector('#status');
    const paxLabel = form.querySelector('label[for="pax"]');
    const paxSelect = form.querySelector('#pax');

    const checkStatus = () => {
        if (statusSelect.value === 'n' || statusSelect.value === '') { // If 'Tidak Hadir' is selected
            paxLabel.style.display = 'none'; // Hide 'pax' label
            paxSelect.style.display = 'none'; // Hide 'pax' select
            paxSelect.removeAttribute('required'); // Remove 'required' attribute
        } else {
            paxLabel.style.display = 'block'; // Show 'pax' label
            paxSelect.style.display = 'block'; // Show 'pax' select
            paxSelect.setAttribute('required', 'true'); // Reinstate 'required' attribute
        }
    };

    statusSelect.addEventListener('change', checkStatus);

    // Initial check in case the form is pre-filled with 'Tidak Hadir'
    checkStatus();

    initialComment();
};
