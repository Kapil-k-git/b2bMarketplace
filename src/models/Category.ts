import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  attributeSchema: [
    {
      key: String,
      type: { type: String, enum: ['select', 'range'] },
      options: [String]
    }
  ]
});

const Category = mongoose.model('category', CategorySchema);

export default Category;