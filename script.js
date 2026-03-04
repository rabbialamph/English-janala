const loadLesson = () =>{
   const url = "https://openapi.programming-hero.com/api/levels/all";
   fetch(url)
   .then((res) => res.json())
   .then((json) => displayPosts(json.data));
};



const displayPosts = (lessons) =>{
   const levelContainer = document.getElementById('level-container');
   levelContainer.innerHTML = "";

   for(let lesson of lessons){
    const btndiv = document.createElement('div');
    btndiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i>Lesson - ${lesson.level_no}</button>`;

    levelContainer.append(btndiv);
   }
};
loadLesson();


const loadLevelWord = (id) =>{
   
    if (!id) {
        wordcontainer.innerHTML = "";
        defaultMessage.style.display = "block";
        return;
    }
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data));
};

const displayLevelWords = (words) =>{
 const wordcontainer = document.getElementById('word-container');
 const defaultMessage = document.getElementById('defualt-massage');

  defaultMessage.style.display = "none";
  wordcontainer.innerHTML = "";

  if(words.length === 0){
   wordcontainer.innerHTML = `
     <div class="text-center justify-center col-span-full space-y-4 font-bangla">
       <img class="mx-auto" src="assets/alert-error.png" alt="">
       <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
       <h2 class="text-3xl font-semibold">নেক্সট Lesson এ যান</h2>
     </div>
   `;
   return;
 }

 words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `<div class="bg-white p-5 space-y-3 text-center rounded-2xl">
    <h2 class="font-semibold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} </h2>
    <p>${word.meaning ? word.meaning : "কোনো অর্থ পাওয়া যায়নি"}</p>
    <div class="font-semibold text-2xl text-gray-500 font-bangla">${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"} </div>  
    <div class="flex justify-between mt-15">
    <div class=" hover:bg-sky-300 bg-sky-100 p-2 rounded-[5px]"><i class="fa-solid fa-circle-info"></i></div>
    <div class=" hover:bg-sky-300 bg-sky-100 p-2 rounded-[5px]"><i class="fa-solid fa-volume-high"></i></div>
    </div>
 </div>`;
    wordcontainer.append(wordCard);
 });
};
    

loadLevelWord();



