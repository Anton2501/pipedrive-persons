import React from "react"
import PersonItem from '~components/person-item';
import API from '~api';
import './style.scss';

function PersonsList() {
    const [list, updateList] = React.useState([]);
    React.useEffect(() => {
        API
            .get('/persons?limit=10')
            .then(({ data }) => updateList(data.data));
    }, []);

    return (
        <ul className="persons-list">
            {list.map(({ id, name, org_name, picture_id }) => (
                <PersonItem key={id} name={name} organization={org_name} userpic={picture_id} />
            ))}
        </ul>
    )
    
    
};

export default PersonsList;
