// database of pcharacters
const characters = [
    {
        id: 1,
        name: 'Albus Dumbledore',
        house: 'Gryffindor',
        role: 'faculty',
        sex: 'm',
        summary: 'Professor Albus Percival Wulfric Brian Dumbledore, Headmaster of Hogwarts School of Witchcraft and Wizardry.',
        profilePicture: '/assets/gryffindor/Albus_Dumbledore.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },
    {
        id: 2,
        name: 'Fred Weasley',
        house: 'Gryffindor',
        role: 'student',
        sex: 'm',
        summary: 'Fred Weasley was an English pure-blood wizard, was the fourth son and the middle child, the most daring and dominant among the twins of Arthur Weasley and Molly Weasley, younger brother to Bill, Charlie and Percy, older twin brother and best friend to George Weasley, and older brother of Ron and Ginny Weasley. Both he and his twin brother were popular students, known for their sense of humour, pranks, inventions and the fact that they were Beaters for the Gryffindor Quidditch team.',
        profilePicture: '/assets/gryffindor/Fred_Weasley.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 3,
        name: 'George Weasley',
        house: 'Gryffindor',
        role: 'student',
        sex: 'm',
        summary: 'George Weasley was an English pure-blood wizard, was the fifth son and the middle child, the most daring and less dominant among the twins of Arthur Weasley and Molly Weasley, younger brother to Bill, Charlie and Percy, younger twin brother and best friend to Fred Weasley, and older brother of Ron and Ginny Weasley. Both he and his twin brother were popular students, known for their sense of humour, pranks, inventions and the fact that they were Beaters for the Gryffindor Quidditch team.',
        profilePicture: '/assets/gryffindor/George_Weasley.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 4,
        name: 'Ginny Weasley',
        house: 'Gryffindor',
        role: 'student',
        sex: 'f',
        summary: 'Ginny Weasley was an English pure-blood witch, the only daughter of Arthur and Molly Weasley and the younger sister of Bill, Charlie, Percy, the late Fred, George and Ron. She was the first female to be born into the Weasley line for several generations. Ginny attended Hogwarts School of Witchcraft and Wizardry a year beneath the famous Harry Potter, and was sorted into Gryffindor House. During her first year, she developed a long-standing crush on Harry Potter and came under the influence of the memory of Tom Riddle\'s sixteen-year-old self, who was preserved in a diary, which forced Ginny to re-open the Chamber of Secrets, endangering the lives of many students, including her own.',
        profilePicture: '/assets/gryffindor/Ginny_Weasley.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },
    
    {
        id: 5,
        name: 'Harry Potter',
        house: 'Gryffindor',
        role: 'student',
        sex: 'm',
        summary: 'Harry Potter is a wizard who survived an attempted murder by an evil dark wizard named Lord Voldemort as an infant, leaving him with a distinctive lightning-shaped scar on his forehead. Harry's survival, coupled with the prophecy that surrounded him and Voldemort led him revered as one of the legendary figures by many in the Wizarding World as the Chosen One who is prophesied to defeat the Dark Lord.',
        profilePicture: '/assets/gryffindor/Harry_Potter.jpeg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 6,
        name: 'Hermione Granger',
        house: 'Gryffindor',
        role: 'student',
        sex: 'f',
        summary: 'Hermione Jean Granger is the daughter of Muggles Mr. and Mrs. Granger who were both dentists in the Muggle London, and the tritagonist of the Harry Potter franchise. She learned, at the age of eleven, that she was a witch and began attending Hogwarts School of Witchcraft and Wizardry where. During her years of Hogwarts, Hermione would become the best friend of Harry Potter and Ron Weasley.',
        profilePicture: '/assets/gryffindor/Hermione_Granger.jpeg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 7,
        name: 'Molly Weasley',
        house: 'Gryffindor',
        role: 'parent',
        sex: 'f',
        summary: 'Molly Weasley (née Prewett) was an English pure-blood witch and matriarch of the Weasley family after marrying Arthur Weasley. Molly and Arthur ended up having seven children, consisting of six sons named Bill, Charlie, Percy, Fred, George and Ron and one daughter named Ginny. She played a large part in the life of Harry Potter, acting as a motherly figure toward him.',
        profilePicture: '/assets/gryffindor/molly_weasley.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 8,
        name: 'Neville Longbottom',
        house: 'Gryffindor',
        role: 'student',
        sex: 'm',
        summary: 'Neville Longbottom was a British pure-blood wizard, the only child of Frank and Alice Longbottom. Neville\'s parents were well-respected Aurors and members of the original Order of the Phoenix until they were tortured into insanity by Bellatrix Lestrange and three other Death Eaters leaving Neville to be raised by his paternal grandmother, Augusta Longbottom. Neville began school at Hogwarts School of Witchcraft and Wizardry in 1991 and was sorted into Gryffindor House, along with Harry Potter, Hermione Granger, and Ronald Weasley. Throughout his school years, he was mostly a shy, clumsy, introverted boy. However, in his later years, he showed that he possessed great courage and perseverance.',
        profilePicture: '/assets/gryffindor/Neville_Longbottom.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 9,
        name: 'Minerva McGonagall',
        house: 'Gryffindor',
        role: 'faculty',
        sex: 'f',
        summary: 'Professor Minerva McGonagall, was a Scottish half-blood witch who attended Hogwarts School of Witchcraft and Wizardry. After her education, Minerva worked for two years at the Ministry of Magic and later returned to Hogwarts, where she became Head of Gryffindor House and the Transfiguration professor. Eventually, Minerva became concurrently, at differing times, Deputy Headmistress and Headmistress of Hogwarts.',
        profilePicture: '/assets/gryffindor/Professor_Minerva_McGonagall.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 10,
        name: 'Rubeus Hagrid',
        house: 'Gryffindor',
        role: 'faculty',
        sex: 'm',
        summary: 'Professor Rubeus Hagrid as an English half-giant wizard. Hagrid attended Hogwarts School of Witchcraft and Wizardry in 1940 and was sorted into Gryffindor house. In Hagrid\'s third year, he was framed by Tom Riddle for the crime of opening the Chamber of Secrets and using his pet Acromantula to attack several Muggle-born students and eventually killing one of them. Though Hagrid's wand was snapped and he was expelled, he was trained as gamekeeper of Hogwarts and allowed to live on the school grounds at the request of Albus Dumbledore. In 1991, Hagrid was given the task of reintroducing Harry Potter to the wizarding world. In 1993, Hagrid would assume the post of Care of Magical Creatures professor.',
        profilePicture: '/assets/gryffindor/Rubeus_Hagrid.webp',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 11,
        name: 'Cho Chang',
        house: 'Ravenclaw',
        role: 'student',
        sex: 'f',
        summary: 'Cho Chang was a witch who attended Hogwarts School of Witchcraft and Wizardry. She was a Seeker for the Ravenclaw Quidditch team and a popular student. She was also one year ahead of the famous Harry Potter. In Cho's fifth year, she began dating Cedric Diggory while he was a Champion in the Triwizard Tournament. Unfortunately, Cedric became one of the first casualties of the Second Wizarding War, when he was murdered by Peter Pettigrew on Lord Voldemort's order in June of 1995. His death greatly upset Cho and made her determined to fight against the recently returned Dark Lord.',
        profilePicture: '/assets/ravenclaw/ChoChang.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 12,
        name: 'Filius Flitwick',
        house: 'Ravenclaw',
        role: 'faculty',
        sex: 'm',
        summary: 'Professor Filius Flitwick was a part-goblin wizard who attended Hogwarts School of Witchcraft and Wizardry. Some time after his graduation, Flitwick returned to Hogwarts and became the Charms Master, as well as the Head of Ravenclaw House.',
        profilePicture: '/assets/ravenclaw/FiliusFlitwick.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 13,
        name: 'Garrick Olivander',
        house: 'Ravenclaw',
        role: 'student',
        sex: 'm',
        summary: 'Garrick Ollivander was a half-blood wizard who was the proprietor of Ollivanders in Diagon Alley during most of the 20th century. Ollivander was widely considered the best wandmaker in the world, and many wizards and witches bought their wands from him. In 1996, Ollivander was captured and tortured by Lord Voldemort. He was rescued in 1998 by Harry Potter, Ron Weasley, Hermione Granger, and Dobby. After he was rescued, he imparted important information regarding wandlore to Harry, helping Harry in his understanding of the Deathly Hallows.',
        profilePicture: '/assets/ravenclaw/GarrickOlivander.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 14,
        name: 'Gilderoy Lockhart',
        house: 'Ravenclaw',
        role: 'faculty',
        sex: 'm',
        summary: 'Professor Gilderoy Lockhart was a half-blood wizard, a Ravenclaw student at Hogwarts School of Witchcraft and Wizardry, and later a famous wizarding celebrity who authored many books on dark creatures and his supposed encounters with them. Prior to his tenure as Professor of Defence Against the Dark Arts at Hogwarts School of Witchcraft and Wizardry, he received many prestigious awards. Lockhart used his considerable talent in Memory Charms to force the actual people into forgetting their achievements, while he took credit for the acts. Lockhart lost all of his memory due to a backfired Memory Charm cast by Ron Weasley\'s damaged wand.',
        profilePicture: '/assets/ravenclaw/GilderoyLockhart.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 15,
        name: 'Luna Lovegood',
        house: 'Ravenclaw',
        role: 'student',
        sex: 'f',
        summary: 'Luna Lovegood was a witch and the only child and daughter of Xenophilius and Pandora Lovegood. Her mother accidentally died while experimenting with spells when Luna was nine and thus Luna was raised by her father, editor of the magazine The Quibbler. Luna attended Hogwarts School of Witchcraft and Wizardry from 1992 to 1999 and was sorted into Ravenclaw House. In her fourth year, Luna participated in the Battle of the Department of Mysteries (1996) and the Battle of the Astronomy Tower (1997), and co-led the reconstituted Dumbledore\'s Army when Hogwarts fell under the control of Lord Voldemort with Severus Snape as Headmaster.',
        profilePicture: '/assets/ravenclaw/LunaLovegood.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },


    {
        id: 16,
        name: 'Myrtle Warren',
        house: 'Ravenclaw',
        role: 'student',
        sex: 'f',
        summary: 'Myrtle Elizabeth Warren, more commonly known after her death as Moaning Myrtle, was a Muggle-born witch who attended Hogwarts School of Witchcraft and Wizardry from 1940 to 1943. She was killed in 1943 by the Serpent of Slytherin, which had been released by Tom Riddle. After the incident, she became a ghost who haunted the second-floor girls bathroom (and occasionally other bathroom facilities) at Hogwarts.',
        profilePicture: '/assets/ravenclaw/MyrtleWarren.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },


    {
        id: 17,
        name: 'Quirinus Quirrel',
        house: 'Ravenclaw',
        role: 'faculty',
        sex: 'm',
        summary: 'Professor Quirinus Quirrell was a half-blood wizard who attended Hogwarts School of Witchcraft and Wizardry and was Sorted into Ravenclaw House. He was the Muggle Studies professor at Hogwarts, though he later became the Defense Against the Dark Arts professor during the 1991–1992 school year. Voldemort took over his body turning him into a temporary Horcrux, though Quirrell put up some feeble resistance. He died while trying to murder Harry Potter in the Underground Chambers.',
        profilePicture: '/assets/ravenclaw/MyrtleWarren.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 18,
        name: 'Rowena Ravenclaw',
        house: 'Ravenclaw',
        role: 'faculty',
        sex: 'f',
        summary: 'Rowena Ravenclaw was a Scottish witch and one of the four founders of Hogwarts School of Witchcraft and Wizardry. She was noted for her intelligence and creativity. Ravenclaw died sometime in the eleventh century, after she fell fatally ill. Legend had it that a broken heart was the cause — because her daughter Helena ran away with her diadem. Rowena\'s portrait remained at Hogwarts.',
        profilePicture: '/assets/ravenclaw/RowenaRavenclaw.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 19,
        name: 'Sybill Trelawney',
        house: 'Ravenclaw',
        role: 'faculty',
        sex: 'f',
        summary: 'Professor Sybill Trelawney was a half-blood witch and Professor of Divination at Hogwarts School of Witchcraft and Wizardry. It was Trelawney who made the prophecy concerning Lord Voldemort and the one with the power to vanquish him (Voldemort took this to mean Harry Potter) during her job interview with Albus Dumbledore. At the end of the 1993–1994 school year, she accurately predicted the escape of Peter Pettigrew and the return of Lord Voldemort.',
        profilePicture: '/assets/ravenclaw/RowenaRavenclaw.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },

    {
        id: 20,
        name: 'Xenophilius Lovegood',
        house: 'Ravenclaw',
        role: 'parent',
        sex: 'm',
        summary: 'Xenophilius Lovegood was a wizard who worked as the editor of The Quibbler magazine, the husband of Pandora, and the father of Luna Lovegood. His wife died when their only child was nine years old, and he raised his daughter by himself. He was likely the source of his daughter\'s eccentric beliefs, although he was often correct in his assumptions. He believed in the existence of the Deathly Hallows and supported Harry in The Quibbler when few others would.',
        profilePicture: '/assets/ravenclaw/XenophiliusLovegood.jpg',
        numberOfReviews: 0,
        averageReview: 0,

        
    },



];

module.exports = characters;