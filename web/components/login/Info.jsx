import React from 'react';
import { Button } from 'react-bootstrap/lib';

/**
 * Application informational for login view.
 */
function Info() {
    return (
        <div id='knowledgebase-info'>
            <h2>{'Build software engineering skills with your community'}</h2>
            <div id='knowledgebase-info-list'>
                <div id='icons'>
                    <i className='fa fa-code' aria-hidden='true'></i>
                    <i className='fa fa-lightbulb-o' aria-hidden='true'></i>
                    <i className='fa fa-users' aria-hidden='true'></i>
                </div>
                <div id='list'>
                    <p>
                        <strong>{' Learn '}</strong>
                        {'from people with knowledge'}
                    </p>
                    <p>
                        <strong>{' Share '}</strong>
                        {'your skills with people that want to learn'}
                    </p>
                    <p>
                        <strong>{' Expand '}</strong>
                        {'your network through skill sharing'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Info;
