import React from 'react';
import './App.css';

/*const name=['clear','multiply','divide','nine','eight','seven','subtract','six', 'five','four','add','three','two','one', 'equals','zero','decimal'];
const keyCodes =[46,106,111,105,104,103,109,102,101,100,107,99,98,97,13,96,110];
const symbols =['ACC', '*','/','9','8','7','-','6','5','4','+','3','2','1','=','0','.'];*/
var summary = '';
var operands = [];
var operand = '';
var number = '';
var maxLength = 21;

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      summary: summary,
      input: ''
    }
    this.onClick = this.onClick.bind(this)
    this.deleteValues = this.deleteValues.bind(this)
    this.calculateResult = this.calculateResult.bind(this)
    this.sanitizeOperands = this.sanitizeOperands.bind(this)
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onClick);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.summary !== this.state.summary) {
      document.getElementById('display').innerHTML = this.state.summary;
      document.getElementById('currentValue').innerHTML = this.state.input;
    } if (prevProps.input !== this.state.input) {
      document.getElementById('display').innerHTML = this.state.summary;
      document.getElementById('currentValue').innerHTML = this.state.input;
    }
  }
  sanitizeOperands(e) {
    number = '';
    operand = e.target.value;
    operands.push(e.target.value);
    if (operands.length > 2) {
      operand = operands[operands.length - 1];
    } else if (operands.length == 1) {
      operand = operands[0]
    } else {
      if (operands[1] == '-') {
        operand = operands[0] + operands[1]
      } else {
        operand = operands[1];
      }
    }
    this.setState({
      summary: summary,
      input: operand
    });
    document.getElementById('currentValue').innerHTML = this.state.input;
  }

  deleteValues() {
    number = '';
    summary = '';
    operand = '';
    operands = [];
    this.setState({
      summary: 0,
      input: 0
    });
    document.getElementById('currentValue').innerHTML = this.state.summary;
    document.getElementById('display').innerHTML = this.state.input;
    //document.getElementById('ocean').style.marginTop = '37.5em';
  }

  calculateResult() {
    summary = eval(summary);
    //summary = summary.toFixed(16)
    if (isNaN(summary)) {
      summary = '0'
    };
    this.setState({
      input: '',
      summary: summary
    });
    document.getElementById('currentValue').innerHTML = this.state.input;
    document.getElementById('display').innerHTML = this.state.summary;
    /*if(parseInt(summary) > 25 && parseInt(summary) < 100) {
  document.getElementById('ocean').style.marginTop = '25em';
      let shape = document.getElementsByTagName("svg")[0];
      shape.setAttribute("viewbox","0 24 175 28");
  } else if(parseInt(summary) > 100 && parseInt(summary) < 200) {
  document.getElementById('ocean').style.marginTop = '15em'
  } else if(parseInt(summary) > 200){
  document.getElementById('ocean').style.marginTop = '5em'}*/
  }


  onClick(e) {
    var value = e.target.value;
    if (value == '.') {
      if (number.includes(value)) {
        value = ''
      }
    }
    if (number.length >= maxLength) {
      document.getElementById('currentValue').innerHTML = 'Max Length Exceeded';
      console.log(3);
    } else {
      number += value;
      summary += operand;
      operands = [];
      operand = '';
      if (summary != '0' || value != '0') {
        summary += value;
        this.setState({
          input: value,
          summary: summary
        });
      } else {
        this.setState({
          input: ''
        });
      }
      document.getElementById('currentValue').innerHTML = this.state.input;
      document.getElementById('display').innerHTML = this.state.summary
    }
  }

  render() {
    return (
      <div className='keyboard'>
        <button id='clear' value='ACC' onClick={this.deleteValues}>ACC</button>
        <button id='multiply' value='*' onClick={this.sanitizeOperands}>*</button>
        <button id='divide' value='/' onClick={this.sanitizeOperands}>/</button>
        <button id='add' value='+' onClick={this.sanitizeOperands}>+</button>
        <button id='subtract' value='-' onClick={this.sanitizeOperands}>-</button>
        <button id='decimal' value='.' onClick={this.onClick}>.</button>
        <button id='equals' value='=' onClick={this.calculateResult}>=</button>
        <button id='nine' value='9' onClick={this.onClick}>9</button>
        <button id='eight' value='8' onClick={this.onClick}>8</button>
        <button id='seven' value='7' onClick={this.onClick}>7</button>
        <button id='six' value='6' onClick={this.onClick}>6</button>
        <button id='five' value='5' onClick={this.onClick}>5</button>
        <button id='four' value='4' onClick={this.onClick}>4</button>
        <button id='three' value='3' onClick={this.onClick}>3</button>
        <button id='two' value='2' onClick={this.onClick}>2</button>
        <button id='one' value='1' onClick={this.onClick}>1</button>
        <button id='zero' value='0' onClick={this.onClick}>0</button>
      </div>

    )
  }
}

const Display = (props) => {
  return (
    <div class='screen'>
      <div>
        <h2 id='display'></h2>
      </div>
      <div id='currentValue'>
        <p></p>
      </div>
    </div>
  )
}

const App = (props) => {
  return (
    <div id='box'>
      <h1>My Calculator</h1>
      <Display />
      <div>
        <Buttons />
      </div>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))

export default App;




/*var xs =[];
for(let i=0; i<=2000; i++){
  xs.push(i);
}
let t =0;
function animate(){
  let points = xs.map(x=>{
    let y = 140 + 15 * Math.sin((x+t) / 60);
    return [x,y]
  });

  let path = 'M'+ points.map(p=>{
    return p[0]+ ',' + p[1]
  }).join('L');
  document.getElementById('path1').setAttribute('d', path);
  t += 0.2;
  requestAnimationFrame(animate)
};

animate();

let a = 0;
function animate1(){
  let points1 = xs.map(x=>{
    let y = 45 + 30 * Math.sin((x+a) / 50);
    return [x,y]
  })


  let path = 'M'+ points1.map(p => {
    return p[0]+ ',' + p[1];
  }).join('L');
  document.getElementById('path2').setAttribute('d', path);
  a += 0.4;
  requestAnimationFrame(animate1);
}

animate1();

let b = 0;
function animate3(){
    let points1 = xs.map(x=>{
    let y = 90 + 20 * Math.sin((x+b) / 40);
    return [x, y];
  });

  let path = 'M'+ points1.map( p => {
    return p[0]+ ',' + p[1];
  }).join('L');
  document.getElementById('path3').setAttribute('d', path);
  b += -0.2;
  requestAnimationFrame(animate3);
}
animate3();*/

/*if(summary > 25){
  document.getElementById('path').style.marginTop = '45em';
}*/
