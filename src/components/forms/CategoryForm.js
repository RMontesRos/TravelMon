// CategoryForm.js
import React, { useContext, useState, useEffect } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';

const CategoryForm = () => {
  const { categories, addCategory, editCategory, deleteCategory } = useContext(CategoryContext);
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Reset form fields when editingCategoryId changes (i.e., when editing starts or finishes)
  useEffect(() => {
    if (editingCategoryId !== null) {
      const categoryToEdit = categories.find(category => category.id === editingCategoryId);
      setName(categoryToEdit.name);
      setIcon(categoryToEdit.icon);
    } else {
      setName('');
      setIcon('');
    }
  }, [editingCategoryId, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategoryId !== null) {
      // If editing, call editCategory
      editCategory(editingCategoryId, name, icon);
    } else {
      // If not editing, call addCategory
      addCategory({ name, icon });
    }
    setName('');
    setIcon('');
    setEditingCategoryId(null); // Reset editing mode
  };

  const handleEdit = (categoryId) => {
    setEditingCategoryId(categoryId);
  };

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId);
  };

  return (
    <div>
        <ul>
        {categories.map(category => (
            <li key={category.id}>
            {category.name} - {category.icon}
            <button onClick={() => handleEdit(category.id)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
            </li>
        ))}
        </ul>
      <form className="form" id="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          required
        />
        <input
          type="text"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Category Icon"
          required
        />
        <button type="submit">{editingCategoryId !== null ? 'Edit Category' : 'Add Category'}</button>
        {editingCategoryId !== null && (
          <button type="button" onClick={() => setEditingCategoryId(null)}>Cancel</button>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;
