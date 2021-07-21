import React, { useState } from "react";
import { Button, Card, Divider, Icon, Loader } from "semantic-ui-react";
import '../styles/cards.css'

const Download = ({item}) => {

  const [link, setLink] = useState(false)
  const [loading,setLoading] = useState(false)

  const getDLink = (item) => {
    // console.log(item)
    setLoading(true)
    fetch('http://127.0.0.1:5000/python/getlink',
      {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(item)
      }
    ).then(res => res.json())
    .then(data => {
      console.log(data)
      if (data) {
        setLoading(false)
        setLink(data.links)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }
  return (

  <div>
    { link === false  && loading === false &&
    <Button onClick={()=>getDLink(item)}>
      <Icon name='download' />
        Get Download Links
    </Button>
    }

    {loading &&  
      <Loader active inline='centered' />
}

    {link && 
    <div>
      <div className="linkContainer" style={{display:'flex', justifyContent:'space-between'}}>
        <a href={link['IPFS.io']} target="_blank" download>
          <Icon name='download' />
          IPFS.io
        </a>
        <a href={link['Cloudflare']} target="_blank" download>
        <Icon name='download' />
          Cloudflare
        </a>
        <a href={link['Infura']} target="_blank" download>
        <Icon name='download' />
          Infura
        </a>
    </div>

    <Divider/>
    
      <a href={link['GET']} target="_blank" download>
          <p style={{textAlign:'center'}}>Visit the libgen website</p>
      </a>

  </div>
  
    
    }
  </div>
)
}

export const Cards = ({ books , filter}) => {

  const bookslist = books.map((item) => {
    if (item['Extension'] === filter || filter === 'all'){
    return (
      <Card
        target="_blank"
        key={item.ID}
        header={item.Title}
        meta={item.Extension}
        description={item.Author}
        extra={<Download item={item}/>}
     />
    );
  }
  });
  return <Card.Group centered> {bookslist} </Card.Group>;
};
