import React from "react";
import EditorExample from "./editor";

import * as firebase from "firebase";
import configFirebase from "./configdb";

import "./estilos.css";
// import { Wrapper } from "./styles"
// // import { FlexContainer, DivCol, Button, Input, Form } from "./styles"
// Or take a look at the integration with react-simple-code-editor:
// import Example from './editor'
// const App = () => (
//   <Wrapper>
//     <h1>Welcome to prism-react-renderer!</h1>
//     <EditorExample />
//   </Wrapper>
// );
// const App = ()=>(
// 	<React.Fragment>
// 		<FlexContainer>
// 			<DivCol bg-gray800 p-4  w-2d4 lg_w-full>
// 				<Form>
// 						<Input outlined bg-pink400 color-white type="text" placeholder="Description"/>
// 						<Button type="submit" color-white bg-pink400 >Save</Button>
// 				</Form>
// 			</DivCol>
// 			<DivCol p-4   w-3d4 lg_w-full>
// 				Hola mundo
// 			</DivCol>
// 		</FlexContainer>
// 	</React.Fragment>
// )

if (!firebase.apps.length) {
  firebase.initializeApp(configFirebase);
}
const db = firebase.database();

class App extends React.Component {
  // propserties
  state = {
    filterText: "",
    titleForm: "New Block Code",
    swForm: false,
    codes: [],
    codeSelected: {
      id: null,
      description: "",
      languaje: "",
      code: "",
      date: firebase.database.ServerValue.TIMESTAMP
    }
  };

  setDataBaseStart() {
    // const keyCode =  db.ref('codes').push().key
    // db.ref('codes').child(keyCode).set({
    // 	id:keyCode,
    // 	description:'Otro codigo en php',
    // 	languaje:'php',
    // 	code:`echo 'hola mundo';`,
    // })

    // get all rows
    // una sola vez.
    // const query = db.ref('codes').orderByKey()
    // query.once('value').then(snapshot=>{
    // 	snapshot.forEach(childSnapshot=>{
    // 		// const key = childSnapshot.key
    // 		const childData = childSnapshot.val()
    // 		this.setState({
    // 			codes:[childData].concat(this.state.codes)
    // 		})
    // 	})
    // })

    // real time db.
    db.ref("codes")
      .orderByChild("date")
      .on("value", snapshot => {
        //cuando cambia.
        const codesSn = snapshot.val();
        if (codesSn) {
          const codes = Object.keys(codesSn)
            .reverse()
            .map(sn => codesSn[sn]);
          // console.log(codes)
          this.setState({
            codes: codes
          });
        }
        // console.log('cambian los datos codes')
        // console.log(codes)

        // for(let keyV in ventas){
        // 	for(let keyP in ventas[keyV].productos){
        // 		ventas[keyV].productos[keyP].producto = store.state.admin.dataBase.productos[keyP]
        // 	}
        // 	ventas[keyV].cliente = store.state.admin.dataBase.clientes[ventas[keyV].cliente]
        // 	ventas[keyV].usuario = store.state.admin.dataBase.usuarios[ventas[keyV].usuario]
        // }
      });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    this.setDataBaseStart();
  }

  handledChange = event => {
    const { name, value } = event.target;
    let codeSelected = JSON.parse(JSON.stringify(this.state.codeSelected));
    codeSelected[name] = value;
    this.setState({ codeSelected: codeSelected });
  };

  handledClickShowCode = row => {
    this.setState({
      codeSelected: row,
      swForm: true,
      titleForm: "Edit Block Code"
    });
  };

  handledClickDelete = row => {
    if (window.confirm("Delete code?")) {
      db.ref("codes")
        .child(row.id)
        .remove();
      this.handledClickClear();
    }
  };

  save = () => {
    if (
      this.state.codeSelected.description === "" ||
      this.state.codeSelected.languaje === "" ||
      this.state.codeSelected.code === ""
    ) {
      alert("All fields required!");
    } else {
      if (this.state.codeSelected.id) {
        //update
        // const codes = this.state.codes.map(c=> c.id===this.state.codeSelected.id?this.state.codeSelected:c)
        // this.setState({
        // 	codes:codes,
        // 	codeSelected:{id:null,description:'', languaje:'', code:''}
        // })

        // update DB(firebase) and emmit 	db.ref('codes').on('value', snapshot..., for update codes in client

        let codeSelected = JSON.parse(JSON.stringify(this.state.codeSelected));
        codeSelected.date = firebase.database.ServerValue.TIMESTAMP;
        db.ref()
          .child(`codes/${this.state.codeSelected.id}`)
          .update(codeSelected);
      } else {
        //crear
        // let codeSelected = JSON.parse(JSON.stringify(this.state.codeSelected))
        // codeSelected.id = Date.now()
        // this.setState({
        // 	codes:[codeSelected].concat(this.state.codes),//add
        // 	codeSelected:{id:null,description:'', languaje:'', code:''}
        // })

        let codeSelected = JSON.parse(JSON.stringify(this.state.codeSelected));
        const keyCode = db.ref("codes").push().key;
        codeSelected.id = keyCode;
        codeSelected.date = firebase.database.ServerValue.TIMESTAMP;
        db.ref("codes")
          .child(keyCode)
          .set(codeSelected); //emit on('value',..)
      }
      this.setState({ swForm: false });
      this.handledClickClear();
    }
  };

  handledSubmitSave = e => {
    e.preventDefault();
    this.save();
  };

  valueChange = code => {
    let codeSelected = JSON.parse(JSON.stringify(this.state.codeSelected));
    codeSelected.code = code;
    this.setState({ codeSelected: codeSelected });
  };

  handledClickClear = () => {
    this.setState({
      codeSelected: { id: null, description: "", languaje: "", code: "" },
      titleForm: "New Block Code"
    });

    setTimeout(() => {
      const filterInput = document.getElementById("description");
      if (filterInput) {
        document.getElementById("description").focus();
      }
    }, 100);
  };

  escFunction = event => {
    if (event.keyCode === 27) {
      event.preventDefault();
      this.setState({ swForm: false });
    }
  };
  handledClickAdd = () => {
    this.setState({ swForm: true, titleForm: "New Block Code" });
    this.handledClickClear();
  };

  handledFilterChange = event => {
    // console.log(event);
    const { value } = event.target;
    this.setState({
      filterText: value
    });
    // console.log(this.state.filterText);
  };
  getFormatDate(date) {
    const dt = new Date(date);
    return `${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
      .getDate()
      .toString()
      .padStart(2, "0")}/${dt
      .getFullYear()
      .toString()
      .padStart(4, "0")} ${dt
      .getHours()
      .toString()
      .padStart(2, "0")}:${dt
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dt
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  }

  getFilterCodes() {
    const filterArray = this.state.filterText
      .trim()
      .toLocaleLowerCase()
      .split(" ");

    if (filterArray.length) {
      return this.state.codes.filter(c => {
        const description = c.description.toLowerCase();
        //every cada elemento de filterArray.
        return filterArray.every(currentValue => {
          return (
            description.indexOf(currentValue) > -1 ||
            c.languaje.indexOf(currentValue) > -1
          );
        });
      });
    }
    return this.state.codes;
  }
  handledClickFilerClear = () => {
    setTimeout(() => {
      this.setState({ filterText: "" });
      document.getElementById("filter").focus();
    });
  };

  handledKeyDown = event => {
    if (event.keyCode === 27) {
      setTimeout(() => {
        this.setState({ filterText: "" });
        document.getElementById("filter").focus();
      });
    }
  };

  render() {
    const codes = this.getFilterCodes();

    const rows = codes.map(row => {
      return (
        <tr key={row.id}>
          <td onClick={() => this.handledClickShowCode(row)}>
            {row.description}
          </td>
          <td>{row.languaje}</td>
          <td>{this.getFormatDate(row.date)}</td>
          <td>
            <button onClick={() => this.handledClickDelete(row)}>Delete</button>
          </td>
        </tr>
      );
    });

    let form = undefined;
    if (this.state.swForm) {
      const bg =
        this.state.titleForm === "New Block Code" ? "bg-indigo" : "bg-purple";
      form = (
        <form
          className={`box form ${bg}`}
          onSubmit={this.handledSubmitSave}
          autoComplete="off"
        >
          <h2>{this.state.titleForm}</h2>
          <br />
          <div className="form-row">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={this.state.codeSelected.description}
              onChange={this.handledChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="languaje">Languaje</label>
            <select
              type="text"
              name="languaje"
              id="languaje"
              placeholder="Languaje"
              value={this.state.codeSelected.languaje}
              onChange={this.handledChange}
            >
              <option value=""></option>
              <option value="javascript">Javascript</option>
              <option value="jsx">jsx</option>
              <option value="tsx">tsx</option>
              <option value="typescript">typescript</option>
              <option value="coffeescript">coffeescript</option>
              <option value="json">json</option>
              <option value="html">html</option>
              <option value="css">css</option>
              <option value="sass">sass</option>
              <option value="less">less</option>
              <option value="php">php</option>
              <option value="java">java</option>
              <option value="visual-basic">visual-basic</option>
              <option value="python">python</option>
              <option value="ruby">ruby</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="code">Code (ctrl+shift+v, paste whit format)</label>
            <EditorExample
              codeSelected={this.state.codeSelected}
              valueChange={code => this.valueChange(code)}
            />
          </div>
          <div className="btns-option">
            <button type="button" onClick={this.handledClickClear}>
              Clear
            </button>
            <button type="submit">Save</button>
            <button
              type="button"
              onClick={() => {
                this.setState({ swForm: false });
              }}
            >
              Close
            </button>
          </div>
        </form>
      );
    } else {
      form = (
        <div className="btn-add">
          <button type="button" onClick={this.handledClickAdd}>
            Add
          </button>
        </div>
      );
    }

    return (
      <React.Fragment>
        {form}
        <div className="flex">
          <div className="box list">
            <h2>Block Codes</h2>
            <br />
            <form className="box filter" autoComplete="off">
              <div className="form-row">
                <label htmlFor="filter">Filter</label>
                <input
                  type="text"
                  name="filter"
                  id="filter"
                  placeholder="Filter"
                  value={this.state.filterText}
                  onChange={this.handledFilterChange}
                  onKeyDown={this.handledKeyDown}
                />
              </div>
              <span
                className="clear-filter"
                onClick={this.handledClickFilerClear}
              >
                &times;
              </span>
            </form>
            <br />
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Languaje</th>
                  <th>Update</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
