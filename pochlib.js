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
//création d'une div afin d'y mettre la corbelle
const trashIcone = document.createElement('div');
trashIcone.className = 'trashIcone';
sectionFav.className = 'sectionFav';
trashIcone.innerHTML = '<i class="fas fa-trash-alt"></i>';


//Fonction qui permet de faire disparaitre le bouton ajouter un livre 
//ainsi que recherche de recherche 
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


//fetch pour récupéré les livres qui sont déjà sauvegardé
const fetchSavedBook = (bookId) => {

    const url = 'https://www.googleapis.com/books/v1/volumes/'
        + bookId;
    fetch(url)
        .then(response => response.json())
        .then((data) => { console.log('booksaved:' + data); createdElementBook('pochlistSection', data); })
        .catch(error => { alert(error) });
}
//API VIA FETCH 
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
        .then((data) => data.items.forEach((book) => { console.log(book); createdElementBook('section', book); }))
        .catch(error => { alert(error) });

    formSearch.addEventListener(('submit'), (e) => {
        e.preventDefault();
    })
    searchTitle.style.display = 'block';
    searchBookResult.style.display = 'block';
}

const initHTML = () => {

    console.log('bla' + localStorage.getItem('bookContent'));
    if (localStorage.getItem('bookContent') != null) {
        const books = JSON.parse(localStorage.getItem('bookContent'));
        books.forEach(book => {
            fetchSavedBook(book);
        })
    }

    //PARAMETRAGE

    addBookButton.innerHTML = "Ajouter un livre";
    pageTitle.after(addBookButton);

    //ETAPE 3 CREE LES CLASSES
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

    //ETAPE 4 PLACER LES ELEMENTS & FONCTION POUR QUE LE BOUTON DISPARAISE 

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

//fonction qui permet de placer le pochListe correctement
const pochListePlacement = () => {

    const parent = document.getElementById('content');
    const child = parent.children[0];
    console.log(parent.children[0]);
    const pochlistSection = document.createElement('section');
    pochlistSection.id = 'pochlistSection';
    child.after(pochlistSection);

}
pochListePlacement();

const createdElementBook = (selectedDiv, book) => {

    // Création d'une section pour y mettre les cards 
    const sectionBloc = document.getElementById(selectedDiv);
    //Création des éléments pour les livres
    const bookContent = document.createElement('div');
    const titleCard = document.createElement('p');
    const idBook = document.createElement('p');
    const authorCard = document.createElement('p');
    const description = document.createElement('p');
    //création d'une div afin d'y mettre le book mark
    const divFavIcon = document.createElement('div');
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
    divFavIcon.className = 'divFavIcon';

    divFavIcon.id = book.id;
    titleCard.textContent = 'Titre : ' + book.volumeInfo.title;
    idBook.textContent = 'Id : ' + book.id;
    //condition pour afficher que le premier auteur 
    authorCard.textContent = book.volumeInfo.authors === undefined ? book.author = "" : 'Auteur : ' + book.volumeInfo.authors[0];
    // condition pour que la description soit limité a 200
    description.textContent = book.volumeInfo.description.length > 200 ? 'Description : ' + book.volumeInfo.description.substring(0, 200) + '...' : 'Description : ' + book.volumeInfo.description;
    divFavIcon.innerHTML = '<i class="fas fa-bookmark"></i>';

    //condition pour afficher les photos des livres et afficher l'image unvailable quand y en a pas
    if (book.volumeInfo.imageLinks === null || book.volumeInfo.imageLinks === undefined) {
        imageCard.src = "/Users/camelia95/Documents/pochlib/pictures/unavailable.png";
    } else {
        imageCard.src = book.volumeInfo.imageLinks.thumbnail;
    }
    divFavIcon.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.parentElement.id);
        const id = e.target.parentElement.id;
        console.log('toto')
        //création d'un tableau vide
        let books = [];
        //si le livre existe déjà dans le tableau, j'obtiens ce livre dans localeStorage avec getItem
        if (localStorage.getItem('bookContent') !== null)
            books = JSON.parse(localStorage.getItem('bookContent'));
        //si le livre trouvé a la même ID que le livre cliqué, il faut alors afficher une alerte
        //la méthode SOME permet de retourner une valeur vrai 
        if (books.some(bookId => bookId === id)) {
            alert(" Vous ne pouvez ajouter deux fois le même livre ")
        } else {
            //si le livre n'existe pas dans le tableau, on le place dans le tableau
            // et ensuite on met le tableau dans le localeStorage
            books.push(id);
            localStorage.setItem('bookContent', JSON.stringify(books));
        }
    })
    bookContent.append(header);
    header.append(titleCard);
    header.append(divFavIcon);
    bookContent.appendChild(idBook);
    bookContent.appendChild(authorCard);
    bookContent.appendChild(description);
    bookContent.appendChild(imageCard);
    sectionBloc.append(bookContent);

}

const favoriteBook = (bookContent) => {
    //création d'un tableau vide
    const books = [];
    //adEvent de la corbeille
    trashIcone.addEventListener('click', (e) => {
        e.preventDefault();
        //si le livre existe déjà dans le tableau, j'obtiens ce livre dans localeStorage avec getItem
        if (localStorage.getItem('bookContent') !== null)
            books = JSON.parse(localStorage.getItem('bookContent'));
        //si le livre trouvé a la même ID que le livre cliqué, il faut alors afficher une alerte
        //la méthode SOME permet de retourner une valeur vrai 
        if (books.some(bookShelf => bookShelf.id === bookContent.id)) {
            alert(" Vous ne pouvez ajouter deux fois le même livre ")
        } else {
            //si le livre n'existe pas dans le tableau, on le place dans le tableau
            // et ensuite on met le tableau dans le localeStorage
            books.push(bookContent);
        }
    })
}
const favsectionBloc = document.createElement('div');
favsectionBloc.className = "favsectionBloc";
const placingfavs = () => {

    //Création des éléments pour les favoris 
    const favbookContent = document.createElement('div');
    const favtitleCard = document.createElement('p');
    const favidBook = document.createElement('p');
    const favauthorCard = document.createElement('p');
    const favdescription = document.createElement('p');
    //création d'une div afin d'y mettre le book mark
    const favimageCard = document.createElement('img');
    const favheader = document.createElement('div');

    favsectionBloc.className = "favsectionBloc";
    favbookContent.className = "bookContent";
    favtitleCard.className = 'favtitleCard';
    favidBook.className = 'idBook';
    favauthorCard.className = 'authorCard';
    favdescription.className = 'favdescription'
    favimageCard.className = 'imageCard';
    favheader.className = 'header';



    favbookContent.append(favheader);
    favheader.append(favtitleCard);
    favheader.append(trashIcone);
    favbookContent.appendChild(favidBook);
    favbookContent.appendChild(favauthorCard);
    favbookContent.appendChild(favdescription);
    favbookContent.appendChild(favimageCard);
    sectionFav.append(favbookContent);
}

const createdFavoriteBook = () => {

    if (localStorage.getItem('bookContent') !== null && localStorage.getItem('bookContent') !== undefined) {
        let favoritelivre = localStorage.getItem('bookContent');
        let foundlivre = JSON.parse(favoritelivre);

        for (const livre in foundlivre) {
            placingfavs();
            avtitleCard.textContent = 'Titre : ' + book.volumeInfo.title;
            favidBook.textContent = 'Id : ' + book.id;
            //condition pour afficher que le premier auteur 
            favauthorCard.textContent = book.volumeInfo.authors === undefined ? book.author = "" : 'Auteur : ' + book.volumeInfo.authors[0];
            // condition pour que la description soit limité a 200
            favdescription.textContent = book.volumeInfo.description.length > 200 ? 'Description : ' + book.volumeInfo.description.substring(0, 200) + '...' : 'Description : ' + book.volumeInfo.description;
            //condition pour afficher les photos des livres et afficher l'image unvailable quand y en a pas
            if (book.volumeInfo.imageLinks === null || book.volumeInfo.imageLinks === undefined) {
                favimageCard.src = "/Users/camelia95/Documents/pochlib/pictures/unavailable.png";
            } else {
                favimageCard.src = book.volumeInfo.imageLinks.thumbnail;
            }

            //adEvent de la corbeille
            trashIcone.addEventListener('click', (e) => {
                e.preventDefault();
                foundlivre.splice(livre, 1);
                localStorage.setItem('livre', JSON.stringify(foundlivre));
                location.reload();
                return false;
            })
        }
    }
}