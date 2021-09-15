//Création des éléménts dont j'ai besoin 
const addBookButton = document.createElement('button');
const pageTitle = document.querySelector('.h2');
const createNewSection = document.createElement('section');
const searchButton = document.createElement('button');
const cancelButton = document.createElement('button');
const titleBook = document.createElement('input');
const author = document.createElement('input');
const formSearch = document.createElement('form');
const formCancel = document.createElement('form');
const labelTitleOfBook = document.createElement('label');
const labelAuthor = document.createElement('label');
const div = document.createElement('div');
//Section qui englobe resultat de recherche + les cards 
const searchBookResult = document.createElement('section');
const sectionFav = document.createElement('section');
sectionFav.className = 'sectionFav';

//Fonction qui permet de faire disparaitre le bouton ajouter un livre ainsi que la recherche du livre
const cancelSearch = () => {
    createNewSection.style.display = "none";
    addBookButton.style.display = "block";
    searchBookResult.style.display = "none";
    searchTitle.style.display = "none";
}

const showElement = () => {

    addBookButton.style.display = "none";
    pageTitle.after(createNewSection);
    createNewSection.appendChild(formSearch);
    formSearch.appendChild(labelTitleOfBook);
    formSearch.appendChild(titleBook);
    formSearch.appendChild(labelAuthor);
    formSearch.appendChild(author);
    formSearch.appendChild(searchButton);
    createNewSection.appendChild(formCancel);
    formCancel.appendChild(cancelButton);

}
//création de resultat de recherche
const searchTitle = document.createElement('h2');
searchTitle.className = 'titreRech';
searchTitle.innerHTML = 'Résultats de Recherche';


//Fetch pour récupérer les livres qui sont déjà sauvegardé
const fetchSavedBook = (bookId) => {

    const url = 'https://www.googleapis.com/books/v1/volumes/'
        + bookId;
    fetch(url)
        .then(response => response.json())
        .then((data) => { console.log('booksaved:' + data); createdElementBook('pochlistSection', data, true); })
        .catch(error => { alert(error) });
}
//API via fetch qui permet de récupérer les livres
const fetchBook = () => {

    const titleSearch = document.querySelector('.titleBook').value;
    console.log(titleSearch);
    const authorSearch = document.querySelector('.author').value;
    const url = 'https://www.googleapis.com/books/v1/volumes?q='
        + titleSearch
        + '+inauthor:'
        + authorSearch
        + '&key=AIzaSyBzPLXXa28wePRlPydq-cwJUNk1sP7W4Hg';
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then((data) => data.items.forEach((book) => { console.log(book); createdElementBook('section', book, false); }))
        .catch(error => { alert(error) });

    formSearch.addEventListener(('submit'), (e) => {
        e.preventDefault();
    })
    searchTitle.style.display = 'block';
    searchBookResult.style.display = 'block';
}

const initHTML = () => {

    //Condition qui permet d'aller chercher les livres sauvagardés dans le local storage
    if (localStorage.getItem('bookContent') != null) {
        const books = JSON.parse(localStorage.getItem('bookContent'));
        books.forEach(book => {
            fetchSavedBook(book);
        })
    }

    //PARAMETRAGE du bouton ajouter un livre 
    addBookButton.innerHTML = "Ajouter un livre";
    pageTitle.after(addBookButton);

    //Création des classes dont on a besoin
    addBookButton.className = "newButton";
    createNewSection.className = "createNewSection";
    searchButton.className = "searchButton";
    cancelButton.className = "cancelButton";
    titleBook.className = "titleBook";
    author.className = "author";
    formSearch.className = "formSearch";
    formCancel.className = "formCancel";
    labelTitleOfBook.className = "labelTitleOfBook";
    labelAuthor.className = "labelAuthor";

    labelTitleOfBook.textContent = "Titre du livre";
    labelAuthor.textContent = "Auteur";
    searchButton.type = "submit";
    cancelButton.type = "cancel";
    searchButton.innerHTML = "Recherche";
    cancelButton.innerHTML = "Annuler";

    addBookButton.addEventListener('click', showElement);
    cancelButton.addEventListener('click', cancelSearch);
    searchButton.addEventListener('click', fetchBook);
}
initHTML();

const newSection = () => {

    const sectionBloc = document.createElement('section');
    const content = document.getElementById('content');
    sectionBloc.id = 'section';
    const searchResult = document.createElement('h3');
    searchResult.className = 'h3';
    searchResult.innerHTML = 'Résultat de recherche';

    searchBookResult.style.display = 'none';
    content.before(searchBookResult);
    searchBookResult.appendChild(sectionBloc);
    sectionBloc.before(searchTitle);
}
newSection();

//Fonction qui permet le placement de Pochliste
const pochListePlacement = () => {

    const parent = document.getElementById('content');
    const child = parent.children[0];
    console.log(parent.children[0]);
    const pochlistSection = document.createElement('section');
    pochlistSection.id = 'pochlistSection';
    child.after(pochlistSection);

}
pochListePlacement();

const createdElementBook = (selectedDiv, book, isPochliste) => {

    // Création d'une section pour y mettre les cards 
    const sectionBloc = document.getElementById(selectedDiv);
    //Création des éléments pour les livres
    const bookContent = document.createElement('div');
    const titleCard = document.createElement('p');
    const idBook = document.createElement('p');
    const authorCard = document.createElement('p');
    const description = document.createElement('p');
    const imageCard = document.createElement('img');
    const header = document.createElement('div');

    //Création des classes dont on a besoin 
    sectionBloc.className = "sectionBloc";
    bookContent.className = "bookContent";
    titleCard.className = 'titleCard';
    idBook.className = 'idBook';
    authorCard.className = 'authorCard';
    description.className = 'description'
    imageCard.className = 'imageCard';
    header.className = 'header';

    titleCard.textContent = 'Titre : ' + book.volumeInfo.title;
    idBook.textContent = 'Id : ' + book.id;
    //condition pour afficher le premier auteur du livre
    authorCard.textContent = book.volumeInfo.authors === undefined ? book.author = "" : 'Auteur : ' + book.volumeInfo.authors[0];
    // condition pour que la description soit limitée a 200 caractères
    description.textContent = book.volumeInfo.description.length > 200 ? 'Description : ' + book.volumeInfo.description.substring(0, 200) + '...' : 'Description : ' + book.volumeInfo.description;

    //condition pour afficher les photos des livres et afficher l'image unvailable quand l'image est indisponible
    if (book.volumeInfo.imageLinks === null || book.volumeInfo.imageLinks === undefined) {
        imageCard.src = "/Users/camelia95/Documents/pochlib/pictures/unavailable.png";
    } else {
        imageCard.src = book.volumeInfo.imageLinks.thumbnail;
    }

    header.append(titleCard);
    //Condition pour afficher la corbeille & le fav icon 
    if (isPochliste) {
        //Création d'une div afin d'y mettre la corbelle
        const trashIcone = document.createElement('div');
        trashIcone.id = book.id;
        trashIcone.className = 'trashIcone';
        trashIcone.innerHTML = '<i class="fas fa-trash-alt"></i>';
        //Clik qui va permettre la suppression du livre
        trashIcone.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.parentElement.id;
            //Création d'un tableau vide 
            let books = [];
            //Si le livre existe déjà dans le tableau, j'obtiens ce livre dans localeStorage avec getItem
            if (localStorage.getItem('bookContent') !== null)
                books = JSON.parse(localStorage.getItem('bookContent'));

            books = books.filter(book => book !== id)
            localStorage.setItem('bookContent', JSON.stringify(books));
            location.reload();
        });
        header.append(trashIcone);

    } else {
        //Création d'une div afin d'y placer le book mark
        const divFavIcon = document.createElement('div');
        divFavIcon.id = book.id;
        divFavIcon.className = 'divFavIcon';
        divFavIcon.innerHTML = '<i class="fas fa-bookmark"></i>';
        divFavIcon.addEventListener('click', (e) => {
            e.preventDefault();

            const id = e.target.parentElement.id;
            //Création d'un tableau vide
            let books = [];
            //si le livre existe déjà dans le tableau, j'obtiens ce livre dans localeStorage avec getItem
            if (localStorage.getItem('bookContent') !== null)
                books = JSON.parse(localStorage.getItem('bookContent'));
            //Si le livre trouvé a la même ID que le livre cliqué, il faut alors afficher une alerte
            //La méthode SOME permet de comparer des valeurs dans un tableau
            if (books.some(bookId => bookId === id)) {
                alert(" Vous ne pouvez ajouter deux fois le même livre ")
            } else {
                //si le livre n'existe pas dans le tableau, on le place dans le tableau
                // et ensuite on met le tableau dans le localeStorage
                books.push(id);
                localStorage.setItem('bookContent', JSON.stringify(books));
            }
        })
        header.append(divFavIcon);
    }
    bookContent.append(header);
    bookContent.appendChild(idBook);
    bookContent.appendChild(authorCard);
    bookContent.appendChild(description);
    bookContent.appendChild(imageCard);
    sectionBloc.append(bookContent);
}