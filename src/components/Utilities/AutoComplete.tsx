import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Tag } from '../../model/model';

const AutoComplete: React.FC<{
    tags: Tag[];
    onConfirm: (tag: Tag) => void;
}> = ({ tags, onConfirm }) => {
    const handleOnSearch = (string: any, results: any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results);
    };

    const handleOnHover = (result: Tag) => {
        // the item hovered
        console.log(result);
    };

    const handleOnSelect = (item: Tag) => {
        // the item selected
        // console.log(item);
        onConfirm(item);
    };

    const handleOnFocus = () => {
        console.log('Focused');
    };

    const formatResult = (item: Tag) => {
        return (
            <>
                {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
                <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
            </>
        );
    };
    return (
        <ReactSearchAutocomplete
            items={tags}
            onSearch={handleOnSearch}
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            showIcon={false}
            styling={{
                height: '47px',
                border: '1px solid transparent',
                borderRadius: '0.5rem',
                backgroundColor: '#F1F5F9',
                boxShadow: 'none',
                hoverBackgroundColor: '#caabff',
                color: '#7C3AED',
                fontSize: '12px',
                fontFamily: 'Courier',
                iconColor: '#7C3AED',
                lineColor: '#7C3AED',
                placeholderColor: '#7C3AED',
                clearIconMargin: '3px 8px 0 0',
                zIndex: 2,
            }}
        />
    );
};

export default AutoComplete;
