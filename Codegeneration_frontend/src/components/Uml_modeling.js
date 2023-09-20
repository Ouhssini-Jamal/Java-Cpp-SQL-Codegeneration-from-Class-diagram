import React, { useState } from 'react';
import { MyClass,JavaTypes,Interface,Method,RelationshipTypes } from '../MyClass'
import '../App.css';
import axios from 'axios';
export default function Uml_modeling() {
  const [classes, setClasses] = useState([]);
  const [interfaces, setInterfaces] = useState([]);
  const [MClassSelect, setMClassSelect] = useState(new MyClass);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSuperClass, setSelectedSuperClass] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedInterface, setSelectedInterface] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedClass1, setSelectedClass1] = useState('');
  const [selectedClass2, setSelectedClass2] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newInterfaceName, setNewInterfaceName] = useState('');
  const [newAttributeName, setnewAttributeName] = useState('');
  const [newFunctionName, setnewFunctionName] = useState('');
  const [newrlname, setNewRlname] = useState('');
  const [minimum1, setMinimum1] = useState('');
  const [maximum1, setMaximum1] = useState('');
  const [minimum2, setMinimum2] = useState('');
  const [maximum2, setMaximum2] = useState('');


  const handleMClassSelect = (event) => {
    for (let i = 0; i < classes.length; i++) {
      if(classes[i].name === event.target.value) 
        setMClassSelect(classes[i]);
  }
  for (let i = 0; i < interfaces.length; i++) {
    if(interfaces[i].name === event.target.value) 
      setMClassSelect(interfaces[i]);
}
}

  const handleAddClass = (name) => {
  const classNameRegex = new RegExp('^[a-zA-Z_$][a-zA-Z0-9_$]*$');
  if (classNameRegex.test(name) && name) {
    const newClass = new MyClass(name);
    alert("The class has been added successfully.");
    setClasses([...classes, newClass]);
    setNewClassName('');
} else {
    alert("The string is not a valid class name.");
    return;
  }
};


const handleAddInterface = (name) => {
  const classNameRegex = new RegExp('^[a-zA-Z_$][a-zA-Z0-9_$]*$');
  if (classNameRegex.test(name) && name) {
    const newi = new Interface(name);
    alert("The Interface has been added successfully.");
    setInterfaces([...interfaces, newi]);
    setNewInterfaceName('');
} else {
    alert("The string is not a valid Interface name.");
    return;
  }
};


const handleNextClick = (event) => {
  var current_fs, next_fs, previous_fs; //fieldsets
  var animating; //flag to prevent quick multi-click glitches
  if (animating) return false;
  animating = true;

  current_fs = event.target.parentNode;
  next_fs = event.target.parentNode.nextElementSibling;

  // activate next step on progressbar using the index of next_fs
  const progressbarListItems = document.querySelectorAll("#progressbar li");
  const fieldsets = document.querySelectorAll("fieldset");
  const nextFsIndex = Array.from(fieldsets).indexOf(next_fs);
  progressbarListItems[nextFsIndex].classList.add("active");
  current_fs.style.display = "none";
  // slide the next fieldset from right to left
  next_fs.style.display = "block";
  next_fs.style.animation = "slideFromLeftToRight 0.8s forwards";
};


const handlePreviousClick = (event) => {
  var current_fs, next_fs, previous_fs; //fieldsets
var animating; //flag to prevent quick multi-click glitches
  if(animating) return false;
  animating = true;
  
current_fs = event.target.parentNode;
previous_fs =  event.target.parentNode.previousElementSibling;
  //activate next step on progressbar using the index of next_fs
const progressbarListItems = document.querySelectorAll("#progressbar li");
const fieldsets = document.querySelectorAll("fieldset");
const curFsIndex = Array.from(fieldsets).indexOf(current_fs);
progressbarListItems[curFsIndex].classList.remove("active");

current_fs.style.display = "none";
previous_fs.style.display = "block";
previous_fs.style.animation = "slideFromRightToLeft 0.8s forwards";
}
const handleAddSuperClass = (name,sname,iname) => {
  const classIndex = classes.findIndex(obj => obj.name === name);
  const updatedClasses = [...classes];
  const selectedClass = updatedClasses[classIndex];
    if(sname !== name && sname){
      selectedClass.extend = sname;
      updatedClasses[classIndex] = selectedClass;
      setClasses(updatedClasses);
       alert("The super class has been assigned successfully.");
  }
  if(iname){
      selectedClass.implement = iname;
      updatedClasses[classIndex] = selectedClass;
      setClasses(updatedClasses);
      alert("The interface has been assigned successfully.");
  }

};

  const handleAddAttribute = () => {
  const attributeNameRegex = new RegExp("^[a-zA-Z][a-zA-Z0-9-]*$");

  if (!attributeNameRegex.test(newAttributeName)) {
    alert("The string is not a valid attribute name.");
    return;
}
 
    let classIndex = null;
    let interIndex = null;
    for (let i = 0; i < classes.length; i++) {
      if(classes[i].name === selectedClass) 
        classIndex = i;
  }
  for (let i = 0; i < interfaces.length; i++) {
    if(interfaces[i].name === selectedClass) 
      interIndex = i;
  }
    if (!newAttributeName || !selectedType) {
      return;
    }
    if (classIndex === null && interIndex === null) {
      return;
    }
  
    const newAttributeObj = {
      n: newAttributeName,
      t: selectedType,
    };

    if(classIndex !== null){
      const updatedClasses = [...classes];
      const selectedClass = updatedClasses[classIndex];
      selectedClass.attributes.push(newAttributeObj);
      updatedClasses[classIndex] = selectedClass;
      setClasses(updatedClasses);
    }
    if(interIndex !== null){
      const updatedInterfaces = [...interfaces];
      const selectedInterface = updatedInterfaces[interIndex];
      selectedInterface.attributes.push(newAttributeObj);
      updatedInterfaces[interIndex] = selectedInterface;
      setInterfaces(updatedInterfaces);
    }
    alert("The Attribute has been added successfully.");
    setnewAttributeName('');
  };
  
  const handleAddFunction = () => {
    let classIndex = null;
    let interIndex = null;
    const FunctionRegex = new RegExp('^[a-z]+([A-Z][a-z]*)*$');
    if (!FunctionRegex.test(newFunctionName)) {
      alert("The string is not a valid Function name.");
      return;
  }
    const newFunction = new Method(newFunctionName);
    newFunction.returntype = selectedType;
    for (let i = 0; i < classes.length; i++) {
      if(classes[i].name === selectedClass) 
        classIndex = i;
     }
    for (let i = 0; i < interfaces.length; i++) {
    if(interfaces[i].name === selectedClass) 
      interIndex = i;
     }

    if (!newFunctionName) {
      return;
    }
    if (classIndex === null && interIndex === null) {
      return;
    }
    if(classIndex !== null){
      const updatedClasses = [...classes];
      const selectedClass = updatedClasses[classIndex];
      selectedClass.functions.push(newFunction);
      updatedClasses[classIndex] = selectedClass;
      console.log(selectedClass.functions);
      setClasses(updatedClasses);
    }
    if(interIndex !== null){
      const updatedInterfaces = [...interfaces];
      const selectedInterface = updatedInterfaces[interIndex];
      selectedInterface.functions.push(newFunction);
      updatedInterfaces[interIndex] = selectedInterface;
      console.log(selectedInterface.functions);
      setInterfaces(updatedInterfaces);
    }
    alert("The Function has been added successfully.");
    setnewFunctionName('');
  }
  const handleAddArgument = () => {
  
  if(!newAttributeName || !selectedType) return;
    const attributeNameRegex = new RegExp("^[a-zA-Z][a-zA-Z0-9-]*$");

  if (!attributeNameRegex.test(newAttributeName)) {
    alert("The string is not a valid Argument name");
    return;
  }
    const newarg = {
      n: newAttributeName,
      t: selectedType,
    };

  
      for (let i = 0; i < MClassSelect.functions.length; i++) {
        if(MClassSelect.functions[i].name === selectedFunction){
          MClassSelect.functions[i].attr.push(newarg);
        }
      }

    if(MClassSelect instanceof MyClass){
      const classIndex = classes.findIndex(obj => obj.name === MClassSelect.name);
      const updatedClasses = [...classes];
      updatedClasses[classIndex] = MClassSelect;
      setClasses(updatedClasses);
    }else{
      const interIndex = interfaces.findIndex(obj => obj.name === MClassSelect.name);
      const updatedinterfaces = [...interfaces];
      updatedinterfaces[interIndex] = MClassSelect;
      setInterfaces(updatedinterfaces);
    }
    alert("The Argument has been added successfully.");
    setnewAttributeName('');
  }


  const handleAddRelationship = () => { 
    if(!selectedClass1 || !selectedClass2 || !selectedType ) return;
    const relationshipNameRegex = new RegExp('^[a-zA-Z]*$');
    // if (!relationshipNameRegex.test(newrlname)) {
    //   alert("The string is not a valid Relationship name.");
    //   return;
    // }
    // const card1 = {
    //   min :minimum1,
    //   max :maximum1,
    // }
    // const card2 = {
    //   min :minimum2,
    //   max :maximum2,
    // }
    // let cl1 = {
    //   name: selectedClass1,
    //   card: card1,
    // };
    // let cl2 = {
    //   name: selectedClass2,
    //   card: card2,
    // };
    // let rl1 = new relation(newrlname,selectedType,cl1,cl2);
    // let rl2 = new relation(newrlname,selectedType,cl2,cl1);
    const classIndex = classes.findIndex(obj => obj.name === selectedClass1);
    const cl = classes.find(obj => obj.name === selectedClass1);
    const updatedClasses = [...classes];
    console.log(updatedClasses);
    if(selectedType === 'Aggregation'){
      updatedClasses[classIndex].agregate.push(selectedClass2);
      alert("The relationship has been added successfully.");
    };
    if(selectedType === 'Composition'){
      updatedClasses[classIndex].composed.push(selectedClass2);
      alert("The relationship has been added successfully.");
    };
    setClasses(updatedClasses);
    console.log(updatedClasses);
    setNewRlname('');
  }


const jsonClasses = JSON.stringify(classes);
const cls = JSON.parse(jsonClasses);
const transformedClasses = cls.map((classObj) => ({
  name: classObj.name,
  attributes: JSON.stringify(classObj.attributes),
  functions: JSON.stringify(classObj.functions),
  package_id: classObj.packageId,
  package_name: classObj.package_name,
  extend: classObj.extend,
  implement: classObj.implement,
  composed : JSON.stringify(classObj.composed),
  agregate : JSON.stringify(classObj.agregate),
}));

  const sendDataToAPI = () => {
    axios.post('http://localhost:3000/classe/create/postClasses', transformedClasses, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        // Handle the API response here
        alert("code generated successfully");
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };

  return (
<div id="msform">
    {/* <!-- progressbar --> */}
    <ul id="progressbar">
      <li className="active">Adding Classes and Interfaces</li>
      <li>Inheritance</li>
      <li>Adding Attributes</li>
      <li>Adding Functions</li>
      <li>Adding Arguments to Functions</li>
      <li>Adding Relationships</li>
    </ul>
    {/* <!-- fieldsets --> */}
   
    <fieldset>
      <h2 className="fs-title">Adding Classes and Interfaces</h2>
      <h3 className="fs-subtitle">step 1</h3>

      <div id="add-class">
        <label htmlFor="addnewclass">Add new Class :  </label>
        <input type='text' id="addclass" value={newClassName} onChange = {(e) => setNewClassName(e.target.value)} />
        <button onClick={() => handleAddClass(newClassName)} className='add-button'>Add Class</button>
      </div>

      <div id="add-interface">
        <label htmlFor="addnewinterface">Add new Interface :  </label>
        <input type='text' id="addinterface" value={newInterfaceName} onChange = {(e) => setNewInterfaceName(e.target.value)} />
        <button onClick={() => handleAddInterface(newInterfaceName)} className='add-button'>Add Interface</button>
      </div>

      <input type="button" name="next" className="next action-button" value="Next" onClick={handleNextClick} />
    </fieldset>

    <fieldset>
      <h2 className="fs-title">Inheritance</h2>
      <h3 className="fs-subtitle">step 2</h3>
      <div>
        <div className='select_div'>   
          <label htmlFor="classSelect">Select a Class : </label>
        <select id="classSelect" name="classSelect" onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
        <option value="">Select a class</option>
          {classes.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend},{classObj.implement})
            </option>
          ))}
        </select>
        </div>

        <div className='select_div'>
        <label htmlFor="superclassSelect">Select a super class: </label>
        <select id="superclassSelect" name="superclassSelect" onChange={(e) => setSelectedSuperClass(e.target.value)} value={selectedSuperClass}>
          <option value="">Select a class</option>
          {classes.map((classObj) => (
            selectedClass !== classObj.name ? (
              <option key={classObj.name} value={classObj.name}>
                {classObj.name} ({classObj.extend},{classObj.implement})
              </option>
            ) : null
          ))}
        </select>
        </div>

        <div className='select_div'>
        <label htmlFor="interfaceSelect">Select an interface:</label>
        <select id="interfaceSelect" name="interfaceSelect" onChange={(e) => setSelectedInterface(e.target.value)} value={selectedInterface}>
          <option value="">Select an interface</option>
          {interfaces.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend})
            </option>
          ))}
        </select>
        </div>

        <button onClick={() => handleAddSuperClass(selectedClass,selectedSuperClass,selectedInterface)} className='add-button'>Add Super Class</button>
      </div>
      <input type="button" name="previous" className="previous action-button" value="Previous" onClick={handlePreviousClick} />
      <input type="button" name="next" className="next action-button" value="Next" onClick={handleNextClick} />
    </fieldset>

    <fieldset>
      <h2 className="fs-title">Adding Attributes</h2>
      <h3 className="fs-subtitle">step 3</h3>
      <div>
      <div className='select_div'>   
          <label htmlFor="classSelect">Select a Class or interface : </label>
        <select id="classSelect" name="classSelect" onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
        <option value="">Select a class or interface</option>
          {classes.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend},{classObj.implement})
            </option>
          ))}
          {interfaces.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend})
            </option>
          ))}
        </select>
        </div>

      <div id="add-class">
        <label htmlFor="addnewattribute">Add new Attribute :  </label>
        <input type='text' id="addattribute" value={newAttributeName} onChange = {(e) => setnewAttributeName(e.target.value)} />
      </div>

      <div className='select_div'>   
       <label htmlFor="classSelect">Select Attribute type : </label>
       <select id="classSelect" name="classSelect" onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
        <option value="">Select Attribute Type</option>
        {Object.keys(JavaTypes).map(key => (
           <option key={key} value={JavaTypes[key]}>{key}</option>
          ))}
        </select>
      </div>

      <button onClick={() => handleAddAttribute(newAttributeName,selectedClass)} className='add-button'>Add Attribute</button>
      </div>
      <input type="button" name="previous" className="previous action-button" value="Previous" onClick={handlePreviousClick} />
      <input type="button" name="next" className="next action-button" value="Next" onClick={handleNextClick} />
    </fieldset>

    <fieldset>
      <h2 className="fs-title">Adding Functions</h2>
      <h3 className="fs-subtitle">step 4</h3>
      <div>

      <div className='select_div'>   
          <label htmlFor="classSelect">Select a Class or interface : </label>
        <select id="classSelect" name="classSelect" onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
        <option value="" >Select a class or interface</option>
          {classes.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend},{classObj.implement})
            </option>
          ))}
          {interfaces.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend})
            </option>
          ))}
        </select>
        </div>

        <div id="add-class">
           <label htmlFor="addnewFunction">Function Name:  </label>
           <input type='text' id="addFunction" value={newFunctionName} onChange = {(e) => setnewFunctionName(e.target.value)} />
        </div>

      
      <div className='select_div'>   
       <label htmlFor="classSelect">Select Return type : </label>
       <select id="classSelect" name="classSelect" onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
        <option value="">Select Return Type</option>
        {Object.keys(JavaTypes).map(key => (
           <option key={key} value={JavaTypes[key]}>{key}</option>
          ))}
        </select>
      </div>

      <button onClick={handleAddFunction} className='add-button'>Add Function</button>
      </div>
      <input type="button" name="previous" className="previous action-button" value="Previous" onClick={handlePreviousClick} />
      <input type="button" name="next" className="next action-button" value="Next" onClick={handleNextClick} />
    </fieldset>

    <fieldset>
      <h2 className="fs-title">Adding Arguments to Functions</h2>
      <h3 className="fs-subtitle">step 5</h3>
      <div>
      <div className='select_div'>   
          <label htmlFor="classSelect">Select a Class or Interface : </label>
        <select id="classSelect" name="classSelect" onChange={handleMClassSelect} value={MClassSelect.name}>
        <option value="">Select a class or interface</option>
          {classes.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend},{classObj.implement})
            </option>
          ))}
          {interfaces.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend})
            </option>
          ))}
        </select>
        </div>

      <div className='select_div'>   
          <label htmlFor="classSelect">Select a Function: </label>
          <select id="classSelect" name="classSelect" onChange={(e) => setSelectedFunction(e.target.value)} value={selectedFunction}>
          <option value="">Select a Function</option>
           {MClassSelect && MClassSelect.functions.map((fun) => (
          <option key={fun.name} value={fun.name}>
                {fun.name}
              </option>
             ))}
           </select>
      </div>

      <div id="add-class">
        <label htmlFor="addnewattribute">Argument Name :  </label>
        <input type='text' id="addattribute" value={newAttributeName} onChange = {(e) => setnewAttributeName(e.target.value)} />
      </div>

      <div className='select_div'>   
          <label htmlFor="classSelect">Select Argument Type: </label>
          <select id="classSelect" name="classSelect" onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
          <option value="">Select Argument Type</option>
          {Object.keys(JavaTypes).map(key => (
           <option key={key} value={JavaTypes[key]}>{key}</option>
          ))}
         </select>
      </div>

      <button onClick={handleAddArgument} className='add-button'>Add Argument</button>
      </div>
      <input type="button" name="previous" className="previous action-button" value="Previous" onClick={handlePreviousClick} />
      <input type="button" name="next" className="next action-button" value="Next" onClick={handleNextClick} />
    </fieldset>


    <fieldset>
      <h2 className="fs-title">Adding Relationships</h2>
      <h3 className="fs-subtitle">step 6</h3>
      <div>

      <div className='select_div'>   
          <label htmlFor="classSelect">Select Class 1 : </label>
        <select id="classSelect" name="classSelect" onChange={(e) => setSelectedClass1(e.target.value)} value={selectedClass1}>
        <option value="">Select class 1</option>
          {classes.map((classObj) => (
            <option key={classObj.name} value={classObj.name}>
              {classObj.name} ({classObj.extend},{classObj.implement})
            </option>
          ))}
        </select>
        </div>

        <div className='select_div'>   
        <label htmlFor="classSelect">Select Class 2 : </label>
        <select id="classSelect" name="classSelect" onChange={(e) => setSelectedClass2(e.target.value)} value={selectedClass2}>
          <option value="">Select class 2</option>
          {classes.map((classObj) => (
            selectedClass1 !== classObj.name ? (
              <option key={classObj.name} value={classObj.name}>
                {classObj.name} ({classObj.extend},{classObj.implement})
              </option>
            ) : null
          ))}
        </select>
        </div>
        
        {/* <div id="add-class">
           <label htmlFor="addnewrl">Relationship Name :  </label>
           <input type='text' id="addrl" value={newrlname} onChange = {(e) => setNewRlname(e.target.value)} />
        </div> */}

        <div className='select_div'>   
       <label htmlFor="classSelect">Select Relationship type : </label>
       <select id="classSelect" name="classSelect" onChange={(e) => setSelectedType(e.target.value)} value={selectedType}>
        <option value="">Select Relationship Type</option>
        {Object.keys(RelationshipTypes).map(key => (
           <option key={key} value={RelationshipTypes[key]}>{key}</option>
          ))}
        </select>
      </div>
{/* 
      <div className='cardinality_div'>
        <label htmlFor="minimumInput">Cardinality : Minimum 1(0,1,..) :</label>
        <input type="text" id="minimumInput" value={minimum1} onChange={(e) => setMinimum1(e.target.value)} />
        <br/>
        <label htmlFor="maximumInput">Cardinality : Maximum 1(1,*,..) :</label>
        <input type="text" id="maximumInput" value={maximum1} onChange={(e) => setMaximum1(e.target.value)} />
      </div>
      
      <div className='cardinality_div'>
        <label htmlFor="minimumInput">Cardinality : Minimum 2(0,1,..) :</label>
        <input type="text" id="minimumInput" value={minimum2} onChange={(e) => setMinimum2(e.target.value)} />
        <br/>
        <label htmlFor="maximumInput">Cardinality : Maximum 2(1,*,..) :</label>
        <input type="text" id="maximumInput" value={maximum2} onChange={(e) => setMaximum2(e.target.value)} />
      </div> */}

      <button onClick={handleAddRelationship} className='add-button'>Add Relationship</button>
      <button onClick={sendDataToAPI} className='add-button'>Send Data</button>
      </div>
      <input type="button" name="previous" className="previous action-button" value="Previous" onClick={handlePreviousClick} />
    </fieldset>
  </div>
  );
}


