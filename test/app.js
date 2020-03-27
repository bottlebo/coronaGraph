const CoronaGraph = require('../');
 /*const _data = [
  {
    id: "a1", state:'s1', descendents: [
      {id: "a0", state:'s1'}, {id: "a12", state:'s1'}, {id: "a13", state:'s2'}, {id: "a14", state:'s3'}
    ]
  },
  {
    id: "a2", state:'s1',image:'images/boy-avatar.png', descendents: [
      {id: "a0", state:'s3'}, {id: "a22", state:'s1'}, {id: "a23", state:'s1'}, {id: "a24", state:'s1'}
    ]
  },
  {
    id: "a3", state:'s1', descendents: [
      {id: "a0"}, {id: "a32"}, {id: "a33"}, {id: "a33"}, {id: "a23"}, {id: "a23"}, {id: "a34"}
    ]
  },
  {
    id: "a4", descendents: [
      {id: "a0"}, {id: "a42",image:'images/boy-avatar.png'}, {id: "a43"}, {id: "a44"}
    ]
  },
  {
    id: "a5", descendents: [
      {id: "a0"}, {id: "a52"}, {id: "a53"}, {id: "a54"}, {id: "a55"}
    ]
  },
  {
    id: "a6", descendents: [
      {id: "a0"}, {id: "a62"}, {id: "a63"}, {id: "a64"}
    ]
  },
  {
    id: "a7", descendents: [
      {id: "a0"}, {id: "a72"}, {id: "a73"}, {id: "a74"}
    ]
  },
  {
    id: "a8", descendents: [
      {id: "a0"}, {id: "a82"}, {id: "a83"}, {id: "a84"}, {id: "a85"}
    ]
  },
  {
    id: "a9", descendents: [
      {id: "a0"}, {id: "a92"}, {id: "a93"}, {id: "a94"}, {id: "a95"}
    ]
  },
  {
    id: "b1", descendents: [
      {id: "a0"}, {id: "b11"}, {id: "b12"}, {id: "b14"}, {id: "b15"}
    ]
  },
  {
    id: "b1", descendents: [
      {id: "a0"}, {id: "b11"}, {id: "b12"}, {id: "b14"}, {id: "b15"}
    ]
  },
  {
    id: "b2", descendents: [
      {id: "a0"}, {id: "b21"}, {id: "b22"}, {id: "b23"}, {id: "b24"}
    ]
  },
  {
    id: "b3", descendents: [
      {id: "a0"}, {id: "b31"}, {id: "b32"}, {id: "b33"}, {id: "b34"}
    ]
  },
  {
    id: "b4", descendents: [
      {id: "a0"}, {id: "b41"}, {id: "b42"}, {id: "b43"}, {id: "b44"}
    ]
  },
];*/
//const _data = 
const _data = [{
    "id": "9881bd6d16158bd56e9b8d6108640903aacf58a7", "state": null,
    "descendents": [
    {"id": "81ecb964edf86162d17f298665c8f4110536ab00"}, 
    {"id": "1bc748c2243e7e0301bb945b2b0da9a57402593c", "state": null}, 
    {"id": "3f73f6d3103e3df706f9b954d59616f5b9e57e26", "state": null}, 
    {"id": "3f73f6d3103e3df706f9b954d59616f5b9e57e26", "state": null}, 
    {"id": "4683451206d28aa0c2d8aa8914abcddaf0ea027d", "state": null}]
  }]
//[{"id":"0cba3b17941d9905fe2dd2c13043ed1f0fcbf849","state":0,"descendents":[{"id":"2bb40a6d7a53150bfa8c10f56ab26a4fcbb039c6"},{"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":0},{"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":0},{"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":0},{"id":"b328a216934709786268cc14409eee50081fce44","state":0},{"id":"2bb40a6d7a53150bfa8c10f56ab26a4fcbb039c6","state":0},{"id":"95308df3434384b9da02582290857010c67c1e56","state":0},
//{"id":"95308df3434384b9da02582290857010c67c1e56","state":0}]}]
const myNode = 
{
  "id": "81ecb964edf86162d17f298665c8f4110536ab00", "state": null}
//id: '2bb40a6d7a53150bfa8c10f56ab26a4fcbb039c6', state: 's10', image: 'images/boy-avatar.png'}
document.addEventListener('DOMContentLoaded', function() {

  const settings = {
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
    graph.addAvatar({id:event.id, image:'images/boy-avatar.png'})
    console.log(event.id)
  });
  graph.on('update', (event) => {
    console.log(event.ids)
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
  graph.init(_data);

});
function update(ids) {
  console.log(ids)
  let result = 
 /*  [
    {"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":1,
  "descendents":[
    {"id":"be75c3019898909269b9f00583ab3c39c6a4c82b","state":1},
    {"id":"7594ae0eb6da3c74403cec1c0cf6cf8c2c806e2f","state":0},
    {"id":"04b5bdc4c0659a7299a1a13911b7e408657cd13e","state":0}]},

    {"id":"b328a216934709786268cc14409eee50081fce44","state":0,
      "descendents":[{"id":"e7c22e6cb028ce03743194697d26c0431422805f","state":0},
                     {"id":"daf4f58b743aa70c71f84caff8e2a9a48adfbf1e","state":0}]},
    {"id":"95308df3434384b9da02582290857010c67c1e56","state":0,
      "descendents":[{"id":"0cba3b17941d9905fe2dd2c13043ed1f0fcbf849","state":0},{"id":"0cba3b17941d9905fe2dd2c13043ed1f0fcbf849","state":0},{"id":"0cba3b17941d9905fe2dd2c13043ed1f0fcbf849","state":0}]}
    ] */
   
   [
  //  {"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":null,
  //   "descendents":[
  //     {"id":"1bc748c2243e7e0301bb945b2b0da9a57402593c","state":null}
  //   ]
  // },
    //{"id":"81ecb964edf86162d17f298665c8f4110536ab00","state":1,"descendents":[{"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":1}]},
    
    {"id":"3f73f6d3103e3df706f9b954d59616f5b9e57e26","state":null,
      "descendents":[
        {"id":"34564061db7cdab49fd589435313747b27558105","state":null},

        {"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":null},
        {"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":null},
      ]},
    {"id":"4683451206d28aa0c2d8aa8914abcddaf0ea027d","state":null,
      "descendents":[
        {"id":"9881bd6d16158bd56e9b8d6108640903aacf58a7","state":null},
        {"id":"9881bd6d16158bd56e9b8d6108640903aacf58a8","state":null}
      ]}
    ]
  //[];
  /* for (let next of ids) {
    let elem = {id: next + "0", state: 's2', image: 'images/boy-avatar.png', descendents: []};
    elem.descendents.push({id: next, state: 's2'});
    elem.descendents.push({id: "b" + "1", state: 's1'})
    elem.descendents.push({id: "b" + "21", state: 's1'})
    elem.descendents.push({id: elem.id + "1", state: 's1'})

    elem.descendents.push({id: elem.id + "2", image: 'images/boy-avatar.png', state: 's2'})
    elem.descendents.push({id: elem.id + "3", state: 's3'})
    result.push(elem)
  } */
  return result;
}
