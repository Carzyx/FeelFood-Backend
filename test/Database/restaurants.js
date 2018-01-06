db.restaurants.insert({

    "_id": "5a2accace4c4178720a6d995",
    "dishes": [],
    "email": "n.balle.lo@gmail.com",
    "images": [
        "http://www.ecocentro.es/imagenes/contenidos/Restaurante%20vegetariano%20Ecocentro%202.jpg",
        "https://media.licdn.com/media/AAEAAQAAAAAAAAKAAAAAJDZjOWViYTMxLTkxYjQtNDU2MC05ZTAyLTFlNjgxNjQ0OGI4NQ.jpg",
        "http://www.sushibo.cat/img/cms/Casanova/Sushibo-safata-w.png",
        "https://portal.restomontreal.ca/gourmet-burger/gallery/images/a_a_gourmet-burger.jpg"
    ],
    "menus": [],
    "name": "Soteras",
    "phone": 123456789,
    "username": "nballelo"
});
db.restaurants.createIndex({name:"text"})