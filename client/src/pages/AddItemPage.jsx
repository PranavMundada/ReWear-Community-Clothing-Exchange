import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddItem = () => {
  const navigate = useNavigate();
  const { token, apiCall } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    color: '',
    brand: '',
    tags: '',
    swapPreferences: {
      lookingFor: [{ category: '', size: '', description: '' }],
      acceptsPoints: true
    },
    location: {
      city: '',
      state: '',
      country: 'US'
    }
  });

  const categories = [
    'clothing', 'shoes', 'accessories', 'bags', 'jewelry', 
    'electronics', 'books', 'home', 'other'
  ];

  const sizes = [
    'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'One Size', 'Other'
  ];

  const conditions = [
    'new', 'like-new', 'good', 'fair', 'vintage'
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Simulate image upload (in real app, would upload to cloud storage)
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(imageUrls => {
      setImages(prev => [...prev, ...imageUrls].slice(0, 5)); // Max 5 images
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const addLookingForItem = () => {
    setFormData(prev => ({
      ...prev,
      swapPreferences: {
        ...prev.swapPreferences,
        lookingFor: [
          ...prev.swapPreferences.lookingFor,
          { category: '', size: '', description: '' }
        ]
      }
    }));
  };

  const updateLookingForItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      swapPreferences: {
        ...prev.swapPreferences,
        lookingFor: prev.swapPreferences.lookingFor.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const removeLookingForItem = (index) => {
    setFormData(prev => ({
      ...prev,
      swapPreferences: {
        ...prev.swapPreferences,
        lookingFor: prev.swapPreferences.lookingFor.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const itemData = {
        ...formData,
        images,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const response = await apiCall('/api/items', {
        method: 'POST',
        body: JSON.stringify(itemData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Item added successfully!');
        setTimeout(() => {
          navigate('/my-items');
        }, 2000);
      } else {
        setError(data.message || 'Failed to add item');
      }
    } catch (err) {
      setError('Failed to add item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-page">
      <div className="page-header">
        <h1>Add New Item</h1>
        <p>Share your items with the ReWear community</p>
      </div>

      <div className="add-item-container">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="add-item-form">
          {/* Basic Information */}
          <section className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Item Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Vintage Levi's 501 Jeans"
                  required
                />
              </div>

              <div className="form-group">
                <label>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Levi's, Nike, Zara"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your item in detail..."
                rows={4}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  placeholder="e.g., jeans, sneakers, t-shirt"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Size</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                >
                  <option value="">Select Size</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Condition *</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Condition</option>
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>
                      {condition.charAt(0).toUpperCase() + condition.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Blue, Red, Black"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., vintage, casual, summer, trendy"
              />
            </div>
          </section>

          {/* Images */}
          <section className="form-section">
            <h3>Images *</h3>
            <p className="section-description">Add up to 5 high-quality photos of your item</p>
            
            <div className="image-upload-area">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload" className="upload-button">
                📷 Upload Images
              </label>
            </div>

            {images.length > 0 && (
              <div className="image-preview-grid">
                {images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img src={image} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Location */}
          <section className="form-section">
            <h3>Location</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleInputChange}
                  placeholder="e.g., New York"
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleInputChange}
                  placeholder="e.g., NY, CA, TX"
                />
              </div>
            </div>
          </section>

          {/* Swap Preferences */}
          <section className="form-section">
            <h3>Swap Preferences</h3>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="swapPreferences.acceptsPoints"
                  checked={formData.swapPreferences.acceptsPoints}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Accept points for this item
              </label>
            </div>

            <div className="looking-for-section">
              <label>What are you looking for in exchange?</label>
              
              {formData.swapPreferences.lookingFor.map((item, index) => (
                <div key={index} className="looking-for-item">
                  <div className="form-row">
                    <div className="form-group">
                      <select
                        value={item.category}
                        onChange={(e) => updateLookingForItem(index, 'category', e.target.value)}
                      >
                        <option value="">Any Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <select
                        value={item.size}
                        onChange={(e) => updateLookingForItem(index, 'size', e.target.value)}
                      >
                        <option value="">Any Size</option>
                        {sizes.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeLookingForItem(index)}
                      disabled={formData.swapPreferences.lookingFor.length === 1}
                    >
                      ×
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateLookingForItem(index, 'description', e.target.value)}
                    placeholder="Describe what you're looking for..."
                  />
                </div>
              ))}

              <button
                type="button"
                className="add-button"
                onClick={addLookingForItem}
              >
                + Add Another Item
              </button>
            </div>
          </section>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/my-items')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading || images.length === 0}
            >
              {loading ? 'Adding Item...' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
