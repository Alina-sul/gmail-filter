import React, {useCallback, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import {Context} from '../../../context';
import {Form, Formik} from "formik";

const Column = props => {
    const { data, index} = props;
    const context = useContext(Context);

    const onClick = useCallback((e) => {

        // if(e.target.className.includes('selected')){
        //     e.target.className = e.target.className.replace(' selected','');
        //     context.setSelected(context.selected.filter(x => x !== context.data[e.target.id]));
        //
        // } else {
        //     e.target.className += ' selected';
        //     context.setSelected(context.selected.concat([context.data[e.target.id]]));
        // }

    },[context.selected]);

    return (
        <>
            {
                data.map((x) => {
                    return console.log(x);
                    })
            }
            <Formik
                initialValues={{

                }}
                onSubmit={ (values) => {

                }}
            >
                <Form>

                </Form>
            </Formik>
        </>
    );
};

Column.propTypes = {
    data: PropTypes.array,
    addFilter: PropTypes.bool,
    index: PropTypes.number
};

export default Column;
