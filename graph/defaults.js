const defaults = {
  myNode: {
    backgroundColor: 'green',
    borderWidth: 4,
    borderStyle: 'double',
    borderColor: 'red',
    width: 55,
    height:55
  },
  node: {
    backgroundColor: 'blue',
    //borderWidth: 4,
    //borderStyle: 'double',
    //borderColor: 'red',
    width: 20,
    height:20
  },
  edges: {
    width: 1,
    lineColor: '#555'
  },
  keyNode: {
    backgroundColor: '#440000',
    borderWidth: 0,
    borderStyle: 'double',
    borderColor: 'red',
    width: 35,
    height:35
  },
  statuses: {
    's1': {
      style: {
        //backgroundColor: 'blue',
        borderWidth: 2,
        borderStyle: 'double',
        borderColor: 'green',
        // width: 10,
        // height: 10
      }
    },
    's2': {
      style: {
        //backgroundColor: 'green',
        borderWidth: 4,
        borderStyle: 'double',
        borderColor: 'red',
        //width: 20,
        //height: 20
      }
    },
    's3': {
      style: {
        //backgroundColor: 'green',
        borderWidth: 4,
        borderStyle: 'double',
        borderColor: 'lime',
        //width: 20,
        //height: 20
      }
    }
  }
}
module.exports = defaults