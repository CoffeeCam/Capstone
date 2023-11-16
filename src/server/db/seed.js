const db = require('./client');
const { createUser } = require('./users');
const{createCharacter}=require('./character');
const {createReview}=require('./review');
const {createAdminUser}=require('./admin');

const users = [
  {
   
    email: 'emily@example.com',
    password: 'securepass',
    house: 'Gryffindor',
  },
  {
    
    email: 'liu@example.com',
    password: 'strongpass',
    house:'Gryffindor',
  },
  {
   
    email: 'bella@example.com',
    password: 'pass1234',
    house:'Slytherin',
  },
  {
   
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
    house:'Slytherin',
  },
  {
    
    email: 'john@example.com',
    password: 'password123',
    house:'Hufflepuff',
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
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            house VARCHAR(255) NOT NULL
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
      await createUser({ email: user.email, password: user.password,house: user.house});
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
      { firstname: 'Albus' ,lastname:'Dumbledore',image:'../src/client/assets/gryffindor/Albus_Dumbledore.webp',house:'Gryffindor',sex:'M',role:'faculty', summary: 'Professor Albus Percival Wulfric Brian Dumbledore, Headmaster of Hogwarts School of Witchcraft and Wizardry.' },
      { firstname: 'Fred ' ,lastname:'Weasley',image:'../src/client/assets/gryffindor/Fred_Weasley.webp',house:'Gryffindor',sex:'M',role:'student', summary: 'Fred Weasley was an English pure-blood wizard, was the fourth son and the middle child, the most daring and dominant among the twins of Arthur Weasley and Molly Weasley, younger brother to Bill, Charlie and Percy, older twin brother and best friend to George Weasley, and older brother of Ron and Ginny Weasley. Both he and his twin brother were popular students, known for their sense of humour, pranks, inventions and the fact that they were Beaters for the Gryffindor Quidditch team.'},
      {firstname: 'George' ,lastname:'Weasley',image:'../src/client/assets/gryffindor/George_Weasley.webp',house:'Gryffindor',sex:'M',role:'student', summary: 'George Weasley was an English pure-blood wizard, was the fifth son and the middle child, the most daring and less dominant among the twins of Arthur Weasley and Molly Weasley, younger brother to Bill, Charlie and Percy, younger twin brother and best friend to Fred Weasley, and older brother of Ron and Ginny Weasley. Both he and his twin brother were popular students, known for their sense of humour, pranks, inventions and the fact that they were Beaters for the Gryffindor Quidditch team.' },
      { firstname: 'Ginny' ,lastname:'Weasley',image:'../src/client/assets/gryffindor/Ginny_Weasley.webp',house:'Gryffindor',sex:'F',role:'student', summary: 'Ginny Weasley was an English pure-blood witch, the only daughter of Arthur and Molly Weasley and the younger sister of Bill, Charlie, Percy, the late Fred, George and Ron. She was the first female to be born into the Weasley line for several generations. Ginny attended Hogwarts School of Witchcraft and Wizardry a year beneath the famous Harry Potter, and was sorted into Gryffindor House. During her first year, she developed a long-standing crush on Harry Potter and came under the influence of the memory of Tom Riddles sixteen-year-old self, who was preserved in a diary, which forced Ginny to re-open the Chamber of Secrets, endangering the lives of many students, including her own.'},
      { firstname: 'Filius' ,lastname:'Flitwick',image:'../src/client/assets/ravenclaw/FiliusFlitwick.jpg',house:'Ravenclaw',sex:'M',role:'faculty', summary: 'Professor Filius Flitwick was a part-goblin wizard who attended Hogwarts School of Witchcraft and Wizardry. Some time after his graduation, Flitwick returned to Hogwarts and became the Charms Master, as well as the Head of Ravenclaw House.'},
      { firstname: 'Harry' ,lastname:'Potter',image:'../src/client/assets/gryffindor/Harry_Potter.jpeg',house:'Gryffindor',sex:'M',role:'student', summary: 'Harry Potter is a wizard who survived an attempted murder by an evil dark wizard named Lord Voldemort as an infant, leaving him with a distinctive lightning-shaped scar on his forehead. Harrys survival, coupled with the prophecy that surrounded him and Voldemort led him revered as one of the legendary figures by many in the Wizarding World as the Chosen One who is prophesied to defeat the Dark Lord.'},
      {firstname:'Cho',lastname:'Chang',image:'../src/client/assets/ravenclaw/ChoChang.jpg',house:'Ravenclaw',sex:'F',role:'student',summary:'Cho Chang was a witch who attended Hogwarts School of Witchcraft and Wizardry. She was a Seeker for the Ravenclaw Quidditch team and a popular student. She was also one year ahead of the famous Harry Potter. In Cho\'s fifth year, she began dating Cedric Diggory while he was a Champion in the Triwizard Tournament. Unfortunately, Cedric became one of the first casualties of the Second Wizarding War, when he was murdered by Peter Pettigrew on Lord Voldemort\'s order in June of 1995. His death greatly upset Cho and made her determined to fight against the recently returned Dark Lord'},
      {firstname:'Garrick',lastname:'Olivander',image:'../src/client/assets/ravenclaw/GarrickOlivander.jpg',house:'Ravenclaw',sex:'M',role:'student',summary:'Garrick Ollivander was a half-blood wizard who was the proprietor of Ollivanders in Diagon Alley during most of the 20th century. Ollivander was widely considered the best wandmaker in the world, and many wizards and witches bought their wands from him. In 1996, Ollivander was captured and tortured by Lord Voldemort. He was rescued in 1998 by Harry Potter, Ron Weasley, Hermione Granger, and Dobby. After he was rescued, he imparted important information regarding wandlore to Harry, helping Harry in his understanding of the Deathly Hallows.'},
      {firstname:'Gilderoy',lastname:'Lockhart',image:'../src/client/assets/ravenclaw/GilderoyLockhart.jpg',house:'Ravenclaw',sex:'M',role:'faculty',summary:'Professor Gilderoy Lockhart was a half-blood wizard, a Ravenclaw student at Hogwarts School of Witchcraft and Wizardry, and later a famous wizarding celebrity who authored many books on dark creatures and his supposed encounters with them. Prior to his tenure as Professor of Defence Against the Dark Arts at Hogwarts School of Witchcraft and Wizardry, he received many prestigious awards. Lockhart used his considerable talent in Memory Charms to force the actual people into forgetting their achievements, while he took credit for the acts. Lockhart lost all of his memory due to a backfired Memory Charm cast by Ron Weasley\'s damaged wand.'},
      {firstname:'Xenophilius',lastname:'Lovegood',image:'../src/client/assets/ravenclaw/XenophiliusLovegood.jpg',house:'Ravenclaw',sex:'M',role:'parent',summary:'Xenophilius Lovegood was a wizard who worked as the editor of The Quibbler magazine, the husband of Pandora, and the father of Luna Lovegood. His wife died when their only child was nine years old, and he raised his daughter by himself. He was likely the source of his daughter\'s eccentric beliefs, although he was often correct in his assumptions. He believed in the existence of the Deathly Hallows and supported Harry in The Quibbler when few others would'},

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
