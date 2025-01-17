    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");
    const book = document.querySelector("#book");
    const chapters = document.querySelector(".back")
    const paper1 = document.querySelector("#p1");
    const paper2 = document.querySelector("#p2");
    const paper3 = document.querySelector("#p3");

    prevBtn.addEventListener("click", goPrevPage);
    nextBtn.addEventListener("click", goNextPage);
    
    let currentLocation = 1;
    let numOfPapers = 3;
    let maxLocation = numOfPapers + 1;

    function openBook() {
        book.style.transform = "translateX(50%)";
    }

    function closeBook(isAtBeginning) {
        if(isAtBeginning) {
            book.style.transform = "translateX(0%)";
        } else {
            book.style.transform = "translateX(100%)";
        }
        prevBtn.style.transform = "translateX(0px)";
        nextBtn.style.transform = "translateX(0px)";
    }
    
    function goNextPage() {
        if(currentLocation < maxLocation) {
            switch(currentLocation) {
                case 1:
                    openBook();
                    paper1.classList.add("flipped");
                    paper1.style.zIndex = 1;
                    break;
                case 2:
                    paper2.classList.add("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 3:
                    paper3.classList.add("flipped");
                    paper3.style.zIndex = 3;
                    break;
                default:
                    throw new Error("unkown state");
                }
                currentLocation++;
            }
        }

        function goPrevPage() {
        if(currentLocation > 1) {
            switch(currentLocation) {
                case 2:
                    closeBook(true);
                    paper1.classList.remove("flipped");
                    paper1.style.zIndex = 3;
                    break;
                case 3:
                    paper2.classList.remove("flipped");
                    paper2.style.zIndex = 2;
                    break;
                case 4:
                    openBook();
                    paper3.classList.remove("flipped");
                    paper3.style.zIndex = 1;
                    break;
                default:
                    throw new Error("unkown state");
            }

            currentLocation--;
        }
    }

    function handlePageClick(pageNumber) {
        console.log(pageNumber,"page");
        if (pageNumber == currentLocation) {
            goNextPage();
        } else if (pageNumber === currentLocation - 1) {
            goPrevPage();
        }
    }



    let chp = document.getElementById('ch');
    const getData = () => {
          
        fetch('https://vedicscriptures.github.io/chapters').then (res => {
    
            return res.json();
    
        }).then(data => {
    
            console.log("data ", data);

            data.forEach(element => {

                chp.innerHTML += `<li class="pb-3 list-unstyled fw-bold" onclick="return summary('Chapter Number : ${element.chapter_number} <br> Chapter Name : ${element.name} <br> Translation : ${element.translation} <br> Meaning : ${element.meaning.hi} <br> Summary : ${element.summary.hi.replaceAll('\n','')}')"><a href="#" class="text-decoration-none text-black">${element.name}</a></li>`;    
            });
        }).catch(err => {

            console.log('Error', err);

        });
    }

    const summary = (summaryText) => {

        console.log(summaryText);
        document.getElementById('summary-content').innerHTML = summaryText;
        console.log(summaryText);
    }
    
    getData();