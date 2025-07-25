let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let turn0 = true;// player->x, player->y
let arr2 = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

boxes.forEach((box)=>
{
    box.addEventListener("click",()=>
        {
            console.log("box was clicked");
            if(turn0)
            {
                box.innerText = "O";
                turn0 = false;

            }
            else{
                box.innerText = "X";
                turn0 = true;
            }
            box.disabled = true;

            checkWinner();
        })
})
const disableBoxes = ()=>
{
   for(box of boxes)
    {

        box.disabled = true;
    } 
}
const showWinner= (winner)=>
{
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = ()=>{
    for(pattern of arr2)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;  
        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
           if(pos1Val==pos2Val && pos2Val == pos3Val)
            {
                showWinner(pos1Val);
            } 
        }
    }

};


const enableBoxes = ()=>
{
   for(box of boxes)
    {

        box.disabled = false;
        box.innerText = "";
    } 
};

const resetGame = ()=>
{
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);