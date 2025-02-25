const container = document.querySelector(".gameboard")

const gameBoard = (function() {
    const board = [[1,2,3], [4,5,6], [7,8,9]];

    const totalElements = board.reduce((sum, row) => sum + row.length, 0);
    
    for(i=0;i<totalElements;i++){
        let btn = document.createElement("button")
        btn.classList.add('tile')
        btn.setAttribute('id',i)

        btn.addEventListener('click', () =>{
            btn.style.backgroundColor='red'
        })
        container.appendChild(btn)
    }

    return board
})();

