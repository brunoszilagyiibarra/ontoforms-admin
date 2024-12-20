import React, {useState} from "react";
import {useLoaderData} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

import "./ontology-page.css"
import ClassesTree from "../../components/classes-tree";
import {
    createOntology,
    getClassDataAndObjectProps,
    getIndividuals,
    getOntoClasses,
    getOntoDataProperties,
    getOntoObjectProperties
} from "../../client/ontoforms-api-client";


export default function OntologyPage(){
    const [file, setFile] = useState()
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFileURL, setUploadedFileURL] = useState(null)
    const [error, setError] = useState();
    const [ontoDetail, setOntoDetail] = useState();
    const [loadedDetail, setLoadedDetail] = useState(0);
    const [ontoSelected, setOntoSelected] = useState();
    const [propDetail, setPropDetail] = useState();
    const [loadedPropDetail, setLoadedPropDetail] = useState(0);

    const [ontoDataPropsDetail, setOntoDataPropsDetail] = useState();
    const [ontoDataPropsDetailLoaded, setOntoDataPropsDetailLoaded] = useState(0);
    const [ontoObjPropsDetail, setOntoObjPropsDetail] = useState();
    const [ontoObjPropsDetailLoaded, setOntoObjPropsDetailLoaded] = useState(0);
    const [classIndividualDetail, setClassIndividualDetail] = useState();
    const [loadedClassIndividualDetail, setLoadedClassIndividualDetail] = useState(0);
    const [ontoIndividualsDetail, setOntoIndividualsDetail] = useState();
    const [ontoIndividualsLoaded, setOntoIndividualsLoaded] = useState(0);

    function handeChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()

        createOntology(file, percentCompleted => setUploadProgress(percentCompleted))
            .then((response) => {
                setUploadedFileURL(response.data.id);
                setUploadProgress(0)
            })
            .catch((error) => {
                console.error("Error uploading file: ", error);
                setError(error.response.data.message);
            });
    }

    const { ontologies } = useLoaderData()


    function handleMouseEnter(e) {
        e.target.parentNode.classList.add("highlight");
    }

    function handleMouseLeave(e) {
        e.target.parentNode.classList.remove("highlight");
    }

    function handleSelection(name, e) {
        setOntoSelected(name)

        getOntoClasses(name)
            .then(classes => {
                setOntoDetail(classes)
                setLoadedDetail(1)
            })
            .catch(error => console.log(error))

        getOntoDataProperties(name)
            .then(props => {
                setOntoDataPropsDetail(props)
                setOntoDataPropsDetailLoaded(1)
            })
            .catch(error => console.log(error))

        getOntoObjectProperties(name)
            .then(props => {
                setOntoObjPropsDetail(props)
                setOntoObjPropsDetailLoaded(1)
            })
            .catch(error => console.log(error))

        getIndividuals(name, null)
            .then(individuals => {
                setOntoIndividualsDetail(individuals)
                setOntoIndividualsLoaded(1)
            })
            .catch(error => console.log(error))
    }

    function handleClassSelection(classid, classUri, e) {
        getClassDataAndObjectProps(ontoSelected, classUri)
            .then(classProps => {
                setPropDetail(classProps)
                setLoadedPropDetail(1)
            })
            .catch(error => console.log(error))

        getIndividuals(ontoSelected, classUri)
            .then(classIndividuals => {
                setClassIndividualDetail(classIndividuals)
                setLoadedClassIndividualDetail(1)
            })
            .catch(error => console.log(error))
    }


    let lists = ontologies.map((item) =>
        <tr key={item.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><a href="#" onClick={(e) => handleSelection(item.name, e)}>Onto detail</a></td>
        </tr>
    );

    const headingStyle = {
        fontSize: '2.5rem',
        color: '#333', // Choose your desired text color
        marginBottom: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    };

    let propDetailSection;

    if(loadedPropDetail) {

        let detail = propDetail.map((item) =>
            <tr key={item.propLabel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.domain}</td>
                <td>{item.propLabel}</td>
                <td>{item.range}</td>
                <td>{item.type}</td>
            </tr>
        );

        if(detail.length === 0) {
            propDetailSection = <div id="onto-prop-detail">
                <h4>Propiedades</h4>
                <a style={{fontSize: "16px"}}>No se tienen propiedades con este dominio.</a>
            </div>
        } else {
            propDetailSection = <div id="onto-prop-detail">
                <h4>Propiedades</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Label</th>
                        <th>Range</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detail}
                    </tbody>
                </table>
            </div>;
        }
    } else {
        propDetailSection = <div id="onto-prop-detail">
            <h4>Propiedades</h4>
            <a style={{fontSize: "16px"}}>Seleccione una clase de la ontología para ver el detalle sus propiedades.</a>
        </div>
    }

    let individualSection;

    if(loadedClassIndividualDetail) {

        let detail = classIndividualDetail.map((item) =>
            <tr key={item.uri} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.prettyName}</td>
                <td>{item.uri}</td>
            </tr>
        );

        if(detail.length === 0) {
            individualSection = <div id="onto-class-indi-detail">
                <h4>Individuos</h4>
                <a style={{fontSize: "16px"}}>No se tienen individuos para esta clase.</a>
            </div>
        } else {
            individualSection = <div id="onto-class-indi-detail">
                <h4>Individuos</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Label</th>
                        <th>Uri</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detail}
                    </tbody>
                </table>
            </div>;
        }
    } else {
        individualSection = <div id="onto-class-indi-detail">
            <h4>Individuos</h4>
            <a style={{fontSize: "16px"}}>Seleccione una clase de la ontología para ver el detalle sus individuos.</a>
        </div>
    }


    let dataPropsSection;

    if(ontoDataPropsDetailLoaded) {

        let detail = ontoDataPropsDetail.map((item) =>
            <tr key={item.propLabel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.domain}</td>
                <td>{item.propLabel}</td>
                <td>{item.range}</td>
            </tr>
        );

        if(detail.length === 0) {
            dataPropsSection = <div id="onto-data-prop-detail">
                <a>No se tienen data propiedades.</a>
            </div>
        } else {
            dataPropsSection = <div id="onto-data-prop-detail">
                <table>
                    <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Label</th>
                        <th>Range</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detail}
                    </tbody>
                </table>
            </div>;
        }
    } else {
        dataPropsSection = <div id="onto-data-prop-detail">
            <p>Dataprops no cargadas.</p>
        </div>
    }

    let objPropsSection;

    if(ontoObjPropsDetailLoaded) {

        let detail = ontoObjPropsDetail.map((item) =>
            <tr key={item.propLabel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.domain}</td>
                <td>{item.propLabel}</td>
                <td>{item.range}</td>
            </tr>
        );

        if(detail.length === 0) {
            objPropsSection = <div id="onto-obj-prop-detail">
                <a>No se tienen object propiedades.</a>
            </div>
        } else {
            objPropsSection = <div id="onto-obj-prop-detail">
                <table>
                    <thead>
                    <tr>
                        <th>Domain</th>
                        <th>Label</th>
                        <th>Range</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detail}
                    </tbody>
                </table>
            </div>;
        }
    } else {
        objPropsSection = <div id="onto-data-prop-detail">
            <p>ObjectProps no cargadas.</p>
        </div>
    }


    let ontIndiduosSection;

    if(ontoIndividualsLoaded) {

        let detail = ontoIndividualsDetail.map((item) =>
            <tr key={item.prettyName} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.uri}</td>
                <td>{item.prettyName}</td>
            </tr>
        );

        if(detail.length === 0) {
            ontIndiduosSection = <div id="onto-individuals-detail">
                <a>No se tienen individuos.</a>
            </div>
        } else {
            ontIndiduosSection = <div id="onto-individuals-detail">
                <table>
                    <thead>
                    <tr>
                        <th>uri</th>
                        <th>Label</th>
                    </tr>
                    </thead>
                    <tbody>
                    {detail}
                    </tbody>
                </table>
            </div>;
        }
    } else {
        ontIndiduosSection = <div id="onto-individuals-detail">
            <p>Individuals no cargadas.</p>
        </div>
    }

    let ontologyDetailSection;

    if (loadedDetail){
       ontologyDetailSection = <div id="onto-detail-container">
           <div id="onto-detail" style={{textAlign: "left", display: "inline-block"}}>
               <h2>Detalle de la Ontología</h2>
               <Tabs className="Tabs">
                   <TabList>
                       <Tab>Classes</Tab>
                       <Tab>Data properties</Tab>
                       <Tab>Object properties</Tab>
                       <Tab>Individuos</Tab>
                   </TabList>
                   <TabPanel>
                       <div id="classes-detail">
                           <div id="tree-view" style={{display: "inline-block", width: "50%", verticalAlign: "top"}}>
                               <ClassesTree handleNodeSelection={(classId, classUri, e) => handleClassSelection(classId, classUri, e)}
                                            nodesGraph={ontoDetail} />
                           </div>
                           <div id="props-detail" style={{display: "inline-block", width: "50%", verticalAlign: "top"}}>
                               {propDetailSection}
                               {individualSection}
                           </div>
                       </div>
                   </TabPanel>
                   <TabPanel>
                       {dataPropsSection}
                   </TabPanel>
                   <TabPanel>
                       {objPropsSection}
                   </TabPanel>
                   <TabPanel>
                       {ontIndiduosSection}
                   </TabPanel>
               </Tabs>
            </div>
       </div>;

    } else {
        ontologyDetailSection = <div id="onto-detail">
        <h2>Detalle de ontología</h2>
        <p>Seleccione una ontología para ver el detalle.</p>
        </div>
    }

    return (
        <div id="detail">
            <h1 style={headingStyle}>Gestión de ontologías</h1>


            <div id="upload-ontology">
                <form onSubmit={handleSubmit}>
                    <h2>Subir ontología</h2>
                    <input type="file" onChange={handeChange}/>
                    <button type="submit">Subir</button>
                </form>
                <progress value={uploadProgress} max="100"></progress>
                {uploadedFileURL && <p>La ontología fue subida con éxito y se identifica con {uploadedFileURL}</p>}
                {error && <p>Error subiendo ontología: {error}</p>}
            </div>

            <div id="ontology-table">
                <h2>Ontologías en el sistema</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Detail</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lists}
                    </tbody>
                </table>
            </div>

           {ontologyDetailSection}
        </div>
    );
}