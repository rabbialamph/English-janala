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
    btndiv.innerHTML = `<button class="btn btn-outline btn-primary"><i class="fa-brands fa-leanpub"></i>Lesson - ${lesson.level_no}</button>`;

    levelContainer.append(btndiv);
   }
};
loadLesson();