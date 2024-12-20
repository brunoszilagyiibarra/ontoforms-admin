import {useState} from 'react';
import {addAppRelation} from "../../client/ontoforms-api-client";

export default function AppRelForm({ontoId}) {
    const [formData, setFormData] = useState({
        appName: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitTranslation = (event) => {
        addAppRelation(ontoId, formData.appName)
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmitTranslation}>
            <label>Ingrese appName:
                <input
                    type="text"
                    name="appName"
                    value={formData.appName}
                    onChange={handleInputChange}
                />
            </label>
            <input type="submit"/>
        </form>
    )
}