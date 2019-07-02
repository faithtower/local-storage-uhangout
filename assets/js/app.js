const joinBtn = document.getElementById('join');
const team = document.querySelector('#team');


const eventListeners = () => {
    //to add a new member
    joinBtn.addEventListener('click', newMember);

    //To remove a member
    team.addEventListener('click', removeMember);

    //document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

const newMember = () => {
    // get username
    const username = document.getElementById('username').value;

    //Get phone number
    const tel = document.getElementById('tel').value;

    //get country
    const country = document.getElementById('countries').value;

    //Get university name
    const university = document.getElementById('university').value

    if (username && tel && university) {
        //creating new html Elements
        createNewMemberElements(username, tel, country, university);

        addToLocalStorage(username, tel, country, university);

        document.getElementById('username').value = '';
        document.getElementById('tel').value = '';
        document.getElementById('university').value = '';
    } else {
        alert('One or More field is empty');
    }


}

const createNewMemberElements = (username, tel, country, university) => {
    //Creating html Elements

    //Create parent Element
    const newMember = document.createElement('div');

    //Creat Children Elements
    const newUsername = document.createElement('h3');
    const newTel = document.createElement('p');
    const newCountry = document.createElement('p');
    const newUniversity = document.createElement('p');
    const deleteBtn = document.createElement('button');

    // Setting the text contents for Elements
    newUsername.textContent = username;
    newTel.textContent = tel;
    newCountry.textContent = country;
    newUniversity.textContent = university;
    deleteBtn.textContent = "Delete";

    //Adding class properties to Elements
    deleteBtn.classList.add('delete-member');

    //append to parent element
    newMember.append(newUsername, newTel, newCountry, newUniversity, deleteBtn);

    //append to team container
    team.appendChild(newMember);

}

const removeMember = (e) => {
    const target = e.target;
    if (target.classList.contains('delete-member')) {
        target.parentElement.remove();
        removeMemberFromLocalStorage(target.parentElement);
    }
}

//Get team member from local storage
const getMemberFromLocalStorage = () => {
    let members;
    let membersLS = localStorage.getItem('members');
    if (membersLS === null) {
        members = [];
    } else {
        members = JSON.parse(membersLS);
    }
    return members;
}

//Add new member to local storage
const addToLocalStorage = (username, tel, country, university) => {
    let members = getMemberFromLocalStorage();

    // create member array
    let newMember = [username, tel, country, university];

    // add member array to members array
    members.push(newMember);

    localStorage.setItem('members', JSON.stringify(members));


}

const localStorageOnLoad = () => {
    let members = getMemberFromLocalStorage();

    members.forEach(member => {
        const username = member[0];
        const tel = member[1];
        const country = member[2];
        const university = member[3];

        createNewMemberElements(username, tel, country, university);

    });

}

const removeMemberFromLocalStorage = (target) => {
    const username = target.firstChild.textContent;

    let members = getMemberFromLocalStorage();
    members.forEach((member, index) => {
        if (member[0] === username) {
            members.splice(index, 1);
        }
    });
    //save the data
    localStorage.setItem('members', JSON.stringify(members));
}




eventListeners();