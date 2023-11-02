const db = require('./client');
const { createUser } = require('./users');
const{createCharacter}=require('./character');
const {createReview}=require('./review');
const {createAdminUser}=require('./admin');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  

const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS character;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS admin;
       
       
        `)
    }
    catch(err) {
        throw err;
    }
}

const createTables = async () => {
    try{
      console.log("Starting to build tables...");
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        `)
        await  db.query(`
        CREATE TABLE character(
          id SERIAL PRIMARY KEY, 
          firstname VARCHAR(255) UNIQUE NOT NULL,
          lastname  VARCHAR(255) NOT NULL,
          image VARCHAR(255),
          house CHAR(20) NOT NULL,
          sex CHAR(1) NOT NULL,
          role CHAR(10) NOT NULL,
          summary TEXT NOT NULL
        );
      `)
        await db.query(`
        CREATE TABLE admin(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) DEFAULT 'name',
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
         );
        `)
       await  db.query(`
       CREATE TABLE reviews(
        id SERIAL PRIMARY KEY, 
        charId INTEGER REFERENCES character(id),
        creatorId INTEGER REFERENCES users(id),
        rating CHAR(1),
        review TEXT NOT NULL
      );
    `)
       console.log("Finished building tables!");
    }
    catch(err) {
      console.error("Error building tables!");
        throw err;
    }
}

const createInitialUsers = async () => {
  try {
    for (const user of users) {
      await createUser({name: user.name, email: user.email, password: user.password});
    }
    console.log('Seed user data inserted successfully.');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};

const createIntialAdimnUser=async()=>{
  try{
    console.log('starting to create admin user');
    const admins=[
      {name:'kalpana' ,email:'kalpravi1989@gmail.com', password:'kalp123'},
      {name:'Cameron' ,email:'cameron93malone@gmail.com', password:'cam123'},
      {name:'Barbara' ,email:'bzkondracki@gmail.com', password:'bar123'}
    ];
    for(const admin of admins){
      await createAdminUser({name:admin.name,email:admin.email,password:admin.password});
    }
    console.log('Seed adminUser data inserted successfully');
  }catch(error){
    console.log('Error creating adminUser!');
    throw error;
  }

};

async function createInitialCharacter() {
  try {
    console.log('Starting to create Character...');

    const characters = [
      { firstname: 'Albus' ,lastname:'Dumbledore',image:'/assets/gryffindor/Albus_Dumbledore.webp',house:'Gryffindor',sex:'M',role:'faculty', summary: 'Professor Albus Percival Wulfric Brian Dumbledore, Headmaster of Hogwarts School of Witchcraft and Wizardry.' },
      { firstname: 'Fred ' ,lastname:'Weasley',image:'/assets/gryffindor/Fred_Weasley.webp',house:'Gryffindor',sex:'M',role:'student', summary: 'Fred Weasley was an English pure-blood wizard, was the fourth son and the middle child, the most daring and dominant among the twins of Arthur Weasley and Molly Weasley, younger brother to Bill, Charlie and Percy, older twin brother and best friend to George Weasley, and older brother of Ron and Ginny Weasley. Both he and his twin brother were popular students, known for their sense of humour, pranks, inventions and the fact that they were Beaters for the Gryffindor Quidditch team.'},
      {firstname: 'George' ,lastname:'Weasley',image:'/assets/gryffindor/George_Weasley.webp',house:'Gryffindor',sex:'M',role:'student', summary: 'George Weasley was an English pure-blood wizard, was the fifth son and the middle child, the most daring and less dominant among the twins of Arthur Weasley and Molly Weasley, younger brother to Bill, Charlie and Percy, younger twin brother and best friend to Fred Weasley, and older brother of Ron and Ginny Weasley. Both he and his twin brother were popular students, known for their sense of humour, pranks, inventions and the fact that they were Beaters for the Gryffindor Quidditch team.' },
      { firstname: 'Ginny' ,lastname:'Weasley',image:'/assets/gryffindor/Ginny_Weasley.webp',house:'Gryffindor',sex:'F',role:'student', summary: 'Ginny Weasley was an English pure-blood witch, the only daughter of Arthur and Molly Weasley and the younger sister of Bill, Charlie, Percy, the late Fred, George and Ron. She was the first female to be born into the Weasley line for several generations. Ginny attended Hogwarts School of Witchcraft and Wizardry a year beneath the famous Harry Potter, and was sorted into Gryffindor House. During her first year, she developed a long-standing crush on Harry Potter and came under the influence of the memory of Tom Riddles sixteen-year-old self, who was preserved in a diary, which forced Ginny to re-open the Chamber of Secrets, endangering the lives of many students, including her own.'},
      { firstname: 'Harry' ,lastname:'Potter',image:'/assets/gryffindor/Harry_Potter.jpeg',house:'Gryffindor',sex:'M',role:'student', summary: 'Harry Potter is a wizard who survived an attempted murder by an evil dark wizard named Lord Voldemort as an infant, leaving him with a distinctive lightning-shaped scar on his forehead. Harrys survival, coupled with the prophecy that surrounded him and Voldemort led him revered as one of the legendary figures by many in the Wizarding World as the Chosen One who is prophesied to defeat the Dark Lord.'},
    ]
    for (const char of characters) {
      await createCharacter({firstname: char.firstname, lastname: char.lastname, image: char.image,house: char.house,sex: char.sex,role: char.role,summary: char.summary});
    }
    console.log('characters created:');
   

    console.log('Finished creating characters!');
  } catch (error) {
    console.error('Error creating characters!');
    throw error;
  }
}
async function createInitialReviews() {
  try {
    console.log('starting to create reviews...');

    const reviews = [
      {creatorId:2, characterId:1 , rating: 'A', review: 'demo demo'},
      {creatorId:1, characterId:1 , rating:'B',  review:'demo demo'},
      {creatorId:3, characterId:1 , rating: 'A',   review:'demo demo'},
      
    ]
    for (const review of reviews) {
      await createReview({charId: review.characterId, creatorId:review.creatorId,rating: review.rating, review: review.review});
    }
    console.log('Finished creating reviews.')
  } catch (error) {
    throw error;
  }
}

const seedDatabase = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialCharacter();
        await createInitialReviews();
        await createIntialAdimnUser();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end()
    }
}

seedDatabase()
