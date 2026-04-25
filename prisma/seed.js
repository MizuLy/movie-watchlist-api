const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userId = "d651563d-eb23-476a-bc3d-013d24f1d3b4";

const movies = [
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology is given a chance to have his criminal record erased.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runTime: 148,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview:
      "Batman raises the stakes in his war on crime by pursuing the Joker, a criminal mastermind who plunges Gotham into anarchy.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runTime: 152,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runTime: 169,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lZrebdSrDW94.jpg",
    createdBy: userId,
  },
  {
    title: "Parasite",
    overview:
      "A poor family schemes to become employed by a wealthy family and infiltrate their household.",
    releaseYear: 2019,
    genres: ["Comedy", "Drama", "Thriller"],
    runTime: 132,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    createdBy: userId,
  },
  {
    title: "The Matrix",
    overview:
      "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runTime: 136,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    createdBy: userId,
  },
  {
    title: "Spirited Away",
    overview:
      "A young girl wanders into a world of gods and witches and monsters and her parents are turned into pigs.",
    releaseYear: 2001,
    genres: ["Animation", "Adventure", "Family"],
    runTime: 125,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    createdBy: userId,
  },
  {
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    runTime: 175,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLegHnDcdh9b.jpg",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in tales of violence and redemption.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runTime: 154,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    createdBy: userId,
  },
  {
    title: "Your Name",
    overview:
      "Two strangers find themselves linked in a bizarre way and begin to search for each other.",
    releaseYear: 2016,
    genres: ["Animation", "Drama", "Romance"],
    runTime: 106,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    createdBy: userId,
  },
  {
    title: "Whiplash",
    overview:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams are mentored by an abusive instructor.",
    releaseYear: 2014,
    genres: ["Drama", "Music"],
    runTime: 107,
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding movies");

  for (const movie of movies) {
    await prisma.movie.create({ data: movie });
    console.log(`Created movie: ${movie.title}`);
  }
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
