onClickSave()
.then((t)=>{
    console.log(note)
})
.catch((err)=>{
    console.log(err);
})


function onClickSave(){
    const pr = new Promise((resolve,reject)=>{
        setNote({...note, description: value});
        if(note.title===""){
            const err = "Title needed"
            reject(err);
        }
        
        let t=1;
        resolve(t)
    });

    return pr
}