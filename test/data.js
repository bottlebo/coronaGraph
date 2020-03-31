const myNode = 
{
id: 'a0', state: 's10', photoUrl: 'images/boy-avatar.png'}
const data = [
  {
    id: "a1", state:'s1', descendents: [
      {id: "a0", state:'s1'}, {id: "a12", state:'s1'}, {id: "a13", state:'s2'}, {id: "a14", state:'s3'}
    ]
  },
  {
    id: "a2", state:'s1',photoUrl:'images/boy-avatar.png', descendents: [
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
      {id: "a0"}, {id: "a42",photoUrl:'images/boy-avatar.png'}, {id: "a43"}, {id: "a44"}
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
];
function update(ids) {
  let result = [];
  for (let next of ids) {
    let elem = {id: next + "0", state: 's2', photoUrl: 'images/boy-avatar.png', descendents: []};
    elem.descendents.push({id: next, state: 's2'});
    elem.descendents.push({id: "b" + "1", state: 's1'})
    elem.descendents.push({id: "b" + "21", state: 's1'})
    elem.descendents.push({id: elem.id + "1", state: 's1'})

    elem.descendents.push({id: elem.id + "2", photoUrl: 'images/boy-avatar.png', state: 's2'})
    elem.descendents.push({id: elem.id + "3", state: 's3'})
    result.push(elem)
  }
  return result;
}
module.exports = {data,myNode, update}