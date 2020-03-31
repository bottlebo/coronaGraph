const CoronaGraph = require('../');
const {data,myNode, update} = require('./data')
 /**/
//const _data = 
const _data = data;
//const _myNode = myNode
document.addEventListener('DOMContentLoaded', function() {

  const settings = {
    question:true,
    myNode: {
      backgroundColor: 'red',
    },
    statuses: {
      's10': {
        style: {
          borderWidth: 2,
          borderStyle: 'double',
          borderColor: 'blue',
        }
      }
    }
  }
  let graph = new CoronaGraph('cy', myNode, settings);
  graph.on('click', (event) => {
    graph.addAvatar({id:event.id, photoUrl:'images/boy-avatar.png'})
    console.log(event.id)
  });
  graph.on('question', ()=> console.log('question clicked'))
  graph.on('update', (event) => {
    const data = update(event.ids)
    graph.add(data);
  })
  graph.on('busy', () => {
    const cy = document.getElementById('cy')
    cy.style.opacity = 0.2;
  })
  graph.on('ready', () => {
    const cy = document.getElementById('cy')
    cy.style.opacity = 1;

  })
  graph.init(data);

});

