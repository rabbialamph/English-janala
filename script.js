const createElements = (arr) =>{
   const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
   return (htmlElements.join(" "));
};

const manageSpinner = (status) => {
   if (status === true){
      document.getElementById("spinner").classList.remove("hidden");
      document.getElementById("word-container").classList.add("hidden");
   } else{
       document.getElementById("word-container").classList.remove("hidden");
      document.getElementById("spinner").classList.add("hidden");
   }
};

const loadLesson = () =>{
   const url = "https://openapi.programming-hero.com/api/levels/all";
   fetch(url)
   .then((res) => res.json())
   .then((json) => displayPosts(json.data));
};

const removeActive = () =>{
   const lessonbtn = document.querySelectorAll(".lessons-btn");
   lessonbtn.forEach((btn) => btn.classList.remove("active"));
}

const loadLevelWord = (id) =>{
   manageSpinner(true);
    if (!id) {
        wordcontainer.innerHTML = "";
        defaultMessage.style.display = "block";
        return;
    }
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
       const clickBtn = document.getElementById(`lesson-btn-${id}`);
       clickBtn.classList.add("active");
         displayLevelWords(data.data)
   });
};

const loadWordDetail = async (id) =>{
   const url = `https://openapi.programming-hero.com/api/word/${id}`;
   const res = await fetch(url);
   const details = await res.json();
   loadWordDisplay(details.data);

};

const loadWordDisplay = (word) =>{
  console.log(word);
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `<div class="">
        <h2  class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"})</h2> 
      </div> 
      <div class="space-y-2">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</p>
      </div>  
       <div class="space-y-2">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence ? word.sentence : "sentence পাওয়া যায়নি"}</p> 
      </div>

       <div class="space-y-2">
        <h2 class="font-bold">Synonym</h2>
        <div class="">${createElements(word.synonyms)}</div>
      </div>`;
  document.getElementById('modal_details').showModal();
};

const displayPosts = (lessons) =>{
   const levelContainer = document.getElementById('level-container');
   levelContainer.innerHTML = "";

   for(let lesson of lessons){
    const btndiv = document.createElement('div');
    btndiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}"
                        onclick="loadLevelWord(${lesson.level_no})"
                        class="btn btn-outline btn-primary cursor-pointer lessons-btn"><i class="fa-brands fa-leanpub"></i>Lesson - ${lesson.level_no}</button>`;

    levelContainer.append(btndiv);
   }
};
loadLesson();



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
   manageSpinner(false);
   return;
 }

 words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `<div class="bg-white p-5 space-y-3 text-center rounded-2xl">
    <h2 class="font-semibold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} </h2>
    <p>${word.meaning ? word.meaning : "কোনো অর্থ পাওয়া যায়নি"}</p>
    <div class="font-semibold text-2xl text-gray-500 font-bangla">${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"} </div>  
    <div class="flex justify-between mt-15">
    <button onclick="loadWordDetail(${word.id})" class=" cursor-pointer hover:bg-sky-300 bg-sky-100 p-2 rounded-[5px]"><i class="fa-solid fa-circle-info"></i></button>
    <button class=" cursor-pointer hover:bg-sky-300 bg-sky-100 p-2 rounded-[5px]"><i class="fa-solid fa-volume-high"></i></button>
    </div>
 </div>`;
    wordcontainer.append(wordCard);
 });
 manageSpinner(false);
};






