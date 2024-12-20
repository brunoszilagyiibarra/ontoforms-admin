import React, {useState} from "react";
import CustomSelect from "../../components/custom-select";
import {useLoaderData} from "react-router-dom";
import {getOntoClasses, getClassForm} from "../../client/ontoforms-api-client";
import ClassesTree from "../../components/classes-tree";
import Grid from "@mui/material/Unstable_Grid2";

export default function FormsPage() {

    const { ontologies } = useLoaderData()
    const [ontoSelected, setOntoSelected] = useState();
    const [ontoDetail, setOntoDetail] = useState();
    const [loadedDetail, setLoadedDetail] = useState(0);
    const [formDetail, setFormDetail] = useState();
    const [formLoadedDetail, setFormLoadedDetail] = useState(0);



    let lists = ontologies.map((item) => {
        const container = {};
        container["label"] = item.name;
        container["value"] = item.name;

        return container;
        }
    );

    function handleMouseEnter(e) {
        e.target.parentNode.classList.add("highlight");
    }

    function handleMouseLeave(e) {
        e.target.parentNode.classList.remove("highlight");
    }

    const isSearchable = true;
    const isMulti = false;

    const headingStyle = {
        fontSize: '2.5rem',
        color: '#333', // Choose your desired text color
        marginBottom: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    };

    function onOntologySelect(ontologyOption) {
        setOntoSelected(ontologyOption.label)
        getOntoClasses(ontologyOption.label)
            .then(classes => {
                setOntoDetail(classes)
                setLoadedDetail(1)
            })
            .catch(error => console.log(error))
    }

    function handleClassSelection(classUri, e) {
        getClassForm(ontoSelected, classUri)
            .then(formInfo => {
                setFormDetail(formInfo)
                setFormLoadedDetail(1)
            })
            .catch(error => console.log(error))
    }

    let selectClassSection;
    if (loadedDetail) {
        selectClassSection = <ClassesTree handleNodeSelection={(classId, classUri, e) => handleClassSelection(classUri, e)}
                                          nodesGraph={ontoDetail} />
    }


    function onFormSelect(e) {
        console.log(e)
    }

    let formClassDetailSection;
    let formClassPreviewSection;

    function DisplayForm({subForms}) {
        if(subForms === null ||!subForms) {
            return <div></div>
        }

        return subForms.map( subSec => {
            return <div>
                <h5>Sección: {subSec.sectionName}</h5>
                <FormFields formFields={subSec.fields} />
                <DisplayForm subForms={subSec.subForms} />
            </div>

            }
        );

    }

    function FormFields({formFields}) {

        if(formFields === null || !formFields) {
            return null
        }

        return formFields.map((field) => {
                if (field.type === "single-option" || field.type === "multi-option") {
                    let options;

                    let multi = field.type === "multi-option";

                    if (field.options) {
                        options = field.options.map((item) => {
                                const container = {};
                                container["label"] = item.label;
                                container["value"] = item.uri;
                                return container;
                            }
                        );
                    }

                    return <div>
                        <label htmlFor={field.label + "_select"}>{field.label}</label>
                        <CustomSelect
                            id={field.label + "_select"}
                            options={options}
                            placeHolder='Selecciona una opción..'
                            onChange={(e) => onFormSelect(e)}
                            isSearchable={true}
                            isMulti={multi}
                        />
                    </div>
                } else if (field.type === "integer") {
                    return <div>
                        <label htmlFor={field.label + "_number"}>{field.label}</label>
                        <input type="number" id={field.label + "_number"}/>
                    </div>
                } else if (field.type === "boolean") {
                    return <div>
                        <label htmlFor={field.label + "_boolean"}>{field.label}</label>
                        <input type="checkbox" id={field.label + "_boolean"}/>
                    </div>
                } else if (field.type === "string") {
                    return <div>
                        <label htmlFor={field.label + "_string"}>{field.label}</label>
                        <input type="text" id={field.label + "_string"}/>
                    </div>
                }

            }
        );

    }


    if(formLoadedDetail) {

        // let detail =  Object.entries(formDetail.fieldsBySection).map(([sectionKey, fields])  => {
        //
        //         return fields.map((field) => {
        //             let options;
        //
        //             if (field.options) {
        //                 options = <ul>{field.options.map(op => <li>{op.label}</li>)}</ul>
        //             }
        //
        //             return <tr key={field.uri} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        //                 <td>{sectionKey}</td>
        //                 <td>{field.label}</td>
        //                 <td>{field.uri}</td>
        //                 <td>{field.type}</td>
        //                 <td>{options}</td>
        //             </tr>
        //         });
        //     }
        // );
        //
        //
        // formClassDetailSection = <div>
        //     <h3>Formulario: {formDetail.id}</h3>
        //     <table>
        //         <thead>
        //         <tr>
        //             <th>Section</th>
        //             <th>Label</th>
        //             <th>Uri</th>
        //             <th>Type</th>
        //             <th>Options</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {detail}
        //         </tbody>
        //     </table>
        // </div>


        // let previewForm = Object.entries(formDetail.fieldsBySection).map(([sectionKey, fields])  => {
        //
        //
        //     let formFields = fields.map((field) => {
        //             if (field.type === "single-option" || field.type === "multi-option") {
        //                 let options;
        //
        //                 let multi = field.type === "multi-option";
        //
        //                 if (field.options) {
        //                     options = field.options.map((item) => {
        //                             const container = {};
        //                             container["label"] = item.label;
        //                             container["value"] = item.uri;
        //                             return container;
        //                         }
        //                     );
        //                 }
        //
        //                 return <div>
        //                     <label htmlFor={field.label + "_select"}>{field.label}</label>
        //                     <CustomSelect
        //                         id={field.label + "_select"}
        //                         options={options}
        //                         placeHolder='Selecciona una opción..'
        //                         onChange={(e) => onFormSelect(e)}
        //                         isSearchable={true}
        //                         isMulti={multi}
        //                     />
        //                 </div>
        //             } else if (field.type === "integer") {
        //                 return <div>
        //                     <label htmlFor={field.label + "_number"}>{field.label}</label>
        //                     <input type="number" id={field.label + "_number"}/>
        //                 </div>
        //             } else if (field.type === "boolean") {
        //                 return <div>
        //                     <label htmlFor={field.label + "_boolean"}>{field.label}</label>
        //                     <input type="checkbox" id={field.label + "_boolean"}/>
        //                 </div>
        //             } else if (field.type === "string") {
        //                 return <div>
        //                     <label htmlFor={field.label + "_string"}>{field.label}</label>
        //                     <input type="text" id={field.label + "_string"}/>
        //                 </div>
        //             }
        //
        //         }
        //     );
        //
        //     return <div>
        //         <h5>Sección: {sectionKey}</h5>
        //         {formFields}
        //     </div>
        //
        // });

        formClassPreviewSection = <div>
            <h3>Preview Formulario: {formDetail.sectionName}</h3>
            <form onSubmit={e => doSubmit(e)}>
                <div>
                    <FormFields formFields={formDetail.fields} />
                    <DisplayForm subForms={formDetail.subForms}/>
                </div>
                <button type="submit">Ingresar</button>
            </form>

        </div>
    }

    function doSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        data.forEach((value, key) =>
            console.log(key + ', ' + value)
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <h1 style={headingStyle}>Gestión de formularios</h1>
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
            <Grid xs={4}>
                {selectClassSection}
            </Grid>
            <Grid xs={8} marginLeft={3}>
                <div id="form-section">
                    {formClassDetailSection}
                </div>
            </Grid>
            <Grid xs={4} marginLeft={4}>
                <div id="form-preview-section">
                    {formClassPreviewSection}
                </div>
            </Grid>
        </Grid>
    )
}