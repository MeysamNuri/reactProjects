import React, { useState } from 'react';
import './App.css';
import Card from './component/Card';

function App() {
  const [myload, setmyload] = useState(false)
  const [mystyle,setMystyle]=useState(false)
  const [text, setText] = useState({
    articles: [
      { id: '1', title: "article 1", body: "this is article 1",active:1 },
      { id: '2', title: "article 2", body: "this is article 2",active:0 },
      { id: '3', title: "article 3", body: "this is article 3",active:1 },
    ]
  })
//  const handleMouseEnter=(e)=>{
// setMystyle(true)

//  }
//  const handleMouseLeave=(e)=>{
// setMystyle(false)

//  }
 const toggleMouse=(e)=>{
  setMystyle(!mystyle)
 }
  //  setTimeout(() => {
  //   setText({
  //     articles:[
  //       {id:'4',title:"article 4",body:"this is article 4"},
  //       {id:'5',title:"article 5",body:"this is article 5"},
  //       {id:'6',title:"article 6",body:"this is article 6"},
  //     ]
  //   })
  //  }, 3000);

  const loadMore = () => {
    setmyload(true)
    let articles =
      [
        { id: '4', title: "article 4", body: "this is article 4",active:1 },
        { id: '5', title: "article 5", body: "this is article 5",active:0 },
        { id: '6', title: "article 6", body: "this is article 6",active:1 },
      ]

    //  setText({
    //    articles: [...text.articles, ...articles]
    //  })
    setTimeout(() => {
      setText(prevstate => {
        return {

          articles: [...prevstate.articles, ...articles],
        }
      })
      setmyload(false)
    }, 3000);
  }
  let articles = text.articles.map(item =>item.active? <Card title={item.title} body={item.body} key={item.id} />:null)
const btnstyle={
  backgroundColor:"rgba(0,0,0,.8)",
  padding:"10px",
  color:"white",
  border:"1px solid"
}
if(mystyle){
  btnstyle.backgroundColor="rgba(0,0,0,.2)"
}

  return (
    <div className="app">
      {
        articles
      }
      {
        myload ? <div>Loading ...</div> : null

      }

      <button onClick={loadMore}
      onMouseEnter={toggleMouse}
      onMouseLeave={toggleMouse}
      style={btnstyle}
      >Load more</button>
    </div>

  );
}

export default App;
