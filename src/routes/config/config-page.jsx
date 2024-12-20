import React, {useState} from "react";
import axios from "axios";
import {useLoaderData} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "./config-page.css"
import {
    deleteAppRelationProps,
    deleteOntoArtificeClasses, deleteOntoCalculatedProps,
    deleteOntoTranslation, getAppRelation,
    getOntoArtificeclasses, getOntoCalculatedProps,
    getOntoTranslations
} from "../../client/ontoforms-api-client";
import Grid from "@mui/material/Unstable_Grid2";
import CustomSelect from "../../components/custom-select";
import TranslationForm from "./translation-form"
import ArtificialForm from "./artificial-form";
import CalcPropsForm from "./calc-props-form";
import AppRelForm from "./app-rel-form";



export default function ConfigsPage(){

    const { ontologies } = useLoaderData()


    const [ontoTranslationsDetail, setOntoTranslationsDetail] = useState();
    const [loadedTranslationDetail, setLoadedTranslationDetail] = useState(0);
    const [ontoSelected, setOntoSelected] = useState();
    const [ontoArtificialClassesDetail, setOntoArtificialClassesDetail] = useState();
    const [loadedArtificialClassesDetail, setLoadedArtificialClassesDetail] = useState(0);

    const [ontoCalculatedPropsDetail, setOntoCalculatedPropsDetail] = useState();
    const [loadedCalculatedPropsDetail, setLoadedCalculatedPropsDetail] = useState(0);

    const [appRelDetail, setAppRelDetail] = useState();
    const [loadedAppRelDetail, setLoadedAppRelDetail] = useState(0);

    let lists = ontologies.map((item) => {
            const container = {};
            container["label"] = item.name;
            container["value"] = item.name;

            return container;
        }
    );

    function onOntologySelect(ontologyOption) {
        setOntoSelected(ontologyOption.label)
        getOntoTranslations(ontologyOption.label)
            .then(translations => {
                setOntoTranslationsDetail(translations)
                setLoadedTranslationDetail(1)
            })
            .catch(error => console.log(error))

        getOntoArtificeclasses(ontologyOption.label)
            .then(artificial => {
                setOntoArtificialClassesDetail(artificial)
                setLoadedArtificialClassesDetail(1)
            })
            .catch(error => console.log(error))

        getOntoCalculatedProps(ontologyOption.label)
            .then(calculatedProps => {
                setOntoCalculatedPropsDetail(calculatedProps)
                setLoadedCalculatedPropsDetail(1)
            })
            .catch(error => console.log(error))

        getAppRelation(ontologyOption.label)
            .then(res => {
                setAppRelDetail(res)
                setLoadedAppRelDetail(1)
            })
            .catch(error => console.log(error))
    }


    function handleMouseEnter(e) {
        e.target.parentNode.classList.add("highlight");
    }

    function handleMouseLeave(e) {
        e.target.parentNode.classList.remove("highlight");
    }

    const headingStyle = {
        fontSize: '2.5rem',
        color: '#333', // Choose your desired text color
        marginBottom: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    };

    function handleTranslationDelete(uri, e) {

        deleteOntoTranslation(ontoSelected, uri)
            .then(classes => {
                getOntoTranslations(ontoSelected)
                    .then(translations => {
                        setOntoTranslationsDetail(translations)
                        setLoadedTranslationDetail(1)
                    })
                    .catch(error => console.log(error))
                    })
            .catch(error => console.log(error))

    }

    function handleArtificialDelete(uri, mainClass, e) {

        deleteOntoArtificeClasses(ontoSelected, uri, mainClass)
            .then(classes => {
                getOntoArtificeclasses(ontoSelected)
                    .then(artificial => {
                        setOntoArtificialClassesDetail(artificial)
                        setLoadedArtificialClassesDetail(1)
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

    }

    function handleCalculatedDelete(uri, mainClassUri, e) {

        deleteOntoCalculatedProps(ontoSelected,uri, mainClassUri)
            .then(classes => {
                getOntoCalculatedProps(ontoSelected)
                    .then(calculatedProps => {
                        setOntoCalculatedPropsDetail(calculatedProps)
                        setLoadedCalculatedPropsDetail(1)
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

    }

    function handleAppRelDelete(appName, e) {
        deleteAppRelationProps(ontoSelected, appName)
            .then(classes => {
                getAppRelation(ontoSelected)
                    .then(res => {
                        setAppRelDetail(res)
                        setLoadedAppRelDetail(1)
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }


    let translationsSection;
    if(loadedTranslationDetail) {
        let translations = ontoTranslationsDetail.map((item) =>
            <tr key={item.propertyUri} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.propertyUri}</td>
                <td>{item.propertyLabelTranslation}</td>
                <td><a href="#" onClick={(e) => handleTranslationDelete(item.propertyUri, e)}>Delete</a></td>
            </tr>
        );

        translationsSection =
            <div id="translation-detail-section">
                <div id="add-translation-form">
                    <TranslationForm ontoId={ontoSelected}/>
                </div>
                <div id="ontology-translations-table">
                    <table>
                        <thead>
                        <tr>
                            <th>Uri</th>
                            <th>Translation Label</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {translations}
                        </tbody>
                    </table>
                </div>
            </div>
    }

    let artificialSection;
    if(loadedArtificialClassesDetail) {
        let artificialClasses = ontoArtificialClassesDetail.map((item) =>
            <tr key={item.classUri} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.mainClassUri}</td>
                <td>{item.classUri}</td>
                <td><a href="#" onClick={(e) => handleArtificialDelete(item.classUri, item.mainClassUri, e)}>Delete</a></td>
            </tr>
        );

        artificialSection =
            <div id="artificial-detail-section">
                <div id="add-artificial-form">
                    <ArtificialForm ontoId={ontoSelected}/>
                </div>
                <div id="ontology-artificial-table">
                    <table>
                        <thead>
                        <tr>
                            <th>MainClass</th>
                            <th>Uri</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {artificialClasses}
                        </tbody>
                    </table>
                </div>
            </div>
    }

    let calcPropsSection;
    if(loadedCalculatedPropsDetail) {
        let calcProps = ontoCalculatedPropsDetail.map((item) =>
            <tr key={item.propUri} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.mainClass}</td>
                <td>{item.propUri}</td>
                <td><a href="#" onClick={(e) => handleCalculatedDelete(item.propUri, item.mainClass, e)}>Delete</a></td>
            </tr>
        );

        calcPropsSection =
            <div id="calculated-detail-section">
                <div id="add-calculated-form">
                    <CalcPropsForm ontoId={ontoSelected}/>
                </div>
                <div id="ontology-calculated-table">
                    <table>
                        <thead>
                        <tr>
                            <th>MainClass</th>
                            <th>Uri</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {calcProps}
                        </tbody>
                    </table>
                </div>
            </div>
    }

    let appRelSection;
    if(loadedAppRelDetail) {
        let calcProps = appRelDetail.map((item) =>
            <tr key={item.appName} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <td>{item.appName}</td>
                <td><a href="#" onClick={(e) => handleAppRelDelete(item.appName, e)}>Delete</a></td>
            </tr>
        );

        appRelSection =
            <div id="appRel-detail-section">
                <div id="add-rel-app-form">
                    <AppRelForm ontoId={ontoSelected}/>
                </div>
                <div id="rel-app-table">
                    <table>
                        <thead>
                        <tr>
                            <th>Application</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {calcProps}
                        </tbody>
                    </table>
                </div>
            </div>
    }


    let ontologyDetailSection;

    if (ontoSelected) {
        ontologyDetailSection = <div id="onto-detail-container">
            <div id="onto-detail" style={{textAlign: "left", display: "inline-block"}}>
                <h2>Configuración de ontología</h2>
                <Tabs className="Tabs">
                    <TabList>
                        <Tab>Texto sobre campos formulario</Tab>
                        <Tab>Clases para ingreso nuevos individuos</Tab>
                        <Tab>Ocultar Propiedades</Tab>
                        <Tab>Aplicaciones vinculadas</Tab>
                    </TabList>
                    <TabPanel>
                        {translationsSection}
                    </TabPanel>
                    <TabPanel>
                        {artificialSection}
                    </TabPanel>
                    <TabPanel>
                        {calcPropsSection}
                    </TabPanel>
                    <TabPanel>
                        {appRelSection}
                    </TabPanel>
                </Tabs>
            </div>
        </div>;

    } else {
        ontologyDetailSection = <div id="onto-detail">
            <h2>Configuración de ontología</h2>
            <p>Seleccione una ontología para ver el detalle de la configuración.</p>
        </div>
    }

    const isSearchable = true;
    const isMulti = false;

    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <h1 style={headingStyle}>Gestión de Configuración</h1>
            </Grid>
            <Grid xs={4} marginLeft={8}>
                <div id="select-ontology-section" style={{display: "inline-block", width: "50%", verticalAlign: "top"}}>
                    <h3>Selecciona una ontología</h3>
                    <CustomSelect
                        options={lists}
                        placeHolder='Selecciona una opción..'
                        onChange={(e) => onOntologySelect(e)}
                        isSearchable={isSearchable}
                        isMulti={isMulti}
                    />
                </div>
            </Grid>
            <Grid xs={12}>
                {ontologyDetailSection}
            </Grid>
        </Grid>
    );
}