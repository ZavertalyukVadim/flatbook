import React from 'react';
import './pagination.scss';

const Page = ({page, onChange}) => <a onClick={() => onChange(page)}>{page}</a>;

const CurrentPage = ({page}) => <span>{page}</span>;

const Pagination = props => {
    const {
        totalPages,
        currentPage,
        getAnnouncementPage
    } = props;

    if (totalPages === 1) {
        return null;
    }

    const onChange = i => () => {
        getAnnouncementPage(i)
    };

    return (
        <ul className="pagination">
            {new Array(totalPages).fill(0).map((_, i) => i + 1).map(i => (
                <li key={i} className="pagination-item">
                    {i === currentPage + 1 ?
                        <CurrentPage page={i}/>
                        :
                        <Page onChange={onChange(i - 1)} page={i}/>
                    }
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
