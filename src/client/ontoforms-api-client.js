import axios from "axios";
import { properties } from '../properties.js';

const BASE_URL = properties.backendProtocolAndHostAndPort + properties.ontoformsApiBasePath

export async function getOntoObjectProperties(ontologyId) {
    return await fetch(BASE_URL + "ontologies/" + ontologyId + "/object_props")
        .then(res => res.json())
}

export async function getOntoDataProperties(ontologyId) {
    return await fetch(BASE_URL + "ontologies/" + ontologyId + "/data_props")
        .then(res => res.json())
}

export async function getOntoClasses(ontologyId) {
    return await fetch(BASE_URL + "ontologies/" + ontologyId + "/classes")
        .then(res => res.json())
}

export async function getClassForm(ontologyId, classUri) {
    var params = new URLSearchParams();
    params.set("classUri", classUri)

    return await fetch(BASE_URL + "ontologies/"+ontologyId+"/forms?" + params.toString())
        .then(res => res.json())
}

export async function getIndividuals(ontologyId, classUri) {
    var params = new URLSearchParams();
    params.set("classUri", classUri)

    return await fetch(BASE_URL + "ontologies/"+ontologyId+"/individuals?"+params.toString())
        .then(res => res.json())
}

export async function getAllOntologies() {
    const ontologies = await
        fetch(BASE_URL + "ontologies")
            .then(res => res.json())
            .then(
                (result) => {
                    const items = [];
                    result.forEach((item) => {
                        let onto = {
                            id: item.id,
                            name: item.name,
                        }
                        items.push(onto)
                    });
                    return items
                },
                (error) => {
                    console.log(error)
                }
            );

    return { ontologies };
}

export async function getClassDataAndObjectProps(ontologyId, classUri) {
    var params = new URLSearchParams();
    params.set("domainClassUri", classUri)


    return await fetch(BASE_URL + "ontologies/"+ontologyId+"/properties?" + params.toString())
        .then(res => res.json())
        .then(
            (result) => {
                return result.map(prop => ({
                    domain: prop.domain,
                    propLabel: prop.propLabel,
                    range: prop.range,
                    type: prop.propType,
                }));
            },
            (error) => {
                console.log(error)
            }
        );
}

export async function createOntology(file, uploadProgressHandler) {

    const formData = new FormData();
    formData.append('file', file);

    const instance = axios.create({
        headers: {'content-type': 'multipart/form-data'},
        onUploadProgress: function(progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadProgressHandler(percentCompleted);
        }
    });

    return await instance.post(BASE_URL + "ontologies", formData)
}

export async function getOntoTranslations(ontologyId) {
    return await fetch(BASE_URL + "ontologies/" + ontologyId + "/configurations/translations")
        .then(res => res.json())
}

export async function deleteOntoTranslation(ontologyId, uri) {
    return await axios.delete(BASE_URL + "ontologies/" + ontologyId + "/configurations/translations", {
        data: {
            propertyUri: uri,
        }
    })
}

export async function addOntoTranslation(ontologyId, uri, translation) {
    return await axios.post(BASE_URL + "ontologies/" + ontologyId + "/configurations/translations",
        {
            propertyUri: uri,
            propertyLabelTranslation: translation
        })
}

export async function getOntoArtificeclasses(ontologyId) {
    return await fetch(BASE_URL + "ontologies/" + ontologyId + "/configurations/artifice-classes")
        .then(res => res.json())
}

export async function deleteOntoArtificeClasses(ontologyId, uri, mainClassUri) {
    return await axios.delete(BASE_URL + "ontologies/" + ontologyId + "/configurations/artifice-classes", {
        data: {
            classUri: uri,
            mainClassUri: mainClassUri
        }
    })
}

export async function addOntoArtificeclass(ontologyId, uri, mainClassUri) {
    return await axios.post(BASE_URL + "ontologies/" + ontologyId + "/configurations/artifice-classes",
        {
            classUri: uri,
            mainClassUri: mainClassUri
        })
}

export async function getOntoCalculatedProps(ontologyId) {
    return await fetch(BASE_URL + "ontologies/" + ontologyId + "/configurations/calculated-properties")
        .then(res => res.json())
}

export async function deleteOntoCalculatedProps(ontologyId, uri, mainClassUri) {
    return await axios.delete(BASE_URL + "ontologies/" + ontologyId + "/configurations/calculated-properties", {
        data: {
            propUri: uri,
            mainClass: mainClassUri,
        }
    })
}

export async function addOntoCalculatedProps(ontologyId, uri, mainClassUri) {
    return await axios.post(BASE_URL + "ontologies/" + ontologyId + "/configurations/calculated-properties",
        {
            propUri: uri,
            mainClass: mainClassUri,
        })
}

export async function getAppRelation(ontologyId) {
    return await fetch(BASE_URL + "ontologies/" + ontologyId + "/configurations/app-mapping")
        .then(res => res.json())
}

export async function deleteAppRelationProps(ontologyId, appName) {
    return await axios.delete(BASE_URL + "ontologies/" + ontologyId + "/configurations/app-mapping", {
        data: {
            appName: appName,
        }
    })
}

export async function addAppRelation(ontologyId, appName) {
    return await axios.post(BASE_URL + "ontologies/" + ontologyId + "/configurations/app-mapping",
        {
            appName: appName,
        })
}