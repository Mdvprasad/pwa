import React from 'react';
import { func, number, shape, string } from 'prop-types';
import { useCategoryTree } from '../../talons/CategoryTree/useCategoryTree';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Branch from './categoryBranch';
import Leaf from './categoryLeaf';
import defaultClasses from './categoryTree.css';

const Tree = props => {
    const { categoryId, onNavigate, setCategoryId, updateCategories } = props;

    const talonProps = useCategoryTree({
        categoryId,
        updateCategories
    });

    const { data, childCategories } = talonProps;
    const classes = mergeClasses(defaultClasses, props.classes);

    // for each child category, render a direct link if it has no children
    // otherwise render a branch
    const branches = data
        ? Array.from(childCategories, childCategory => {
            const [id, { category, isLeaf }] = childCategory;
            return isLeaf ? (
                <Leaf key={id} category={category} onNavigate={onNavigate} />
            ) : (
                <Branch
                    key={id}
                    category={category}
                    setCategoryId={setCategoryId}
                />
            );
        })
        : null;

    return (
        <div className={classes.root}>
            <ul className={classes.tree}>{branches}</ul>
        </div>
    );
};

export default Tree;

Tree.propTypes = {
    categoryId: number,
    classes: shape({
        root: string,
        tree: string
    }),
    onNavigate: func.isRequired,
    setCategoryId: func.isRequired,
    updateCategories: func.isRequired
};
