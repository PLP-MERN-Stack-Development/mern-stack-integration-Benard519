import Post from '../models/Post.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database connection not available. Please check your MongoDB connection and .env file.',
      });
    }

    const { search, category } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    const posts = await Post.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch posts. Please check your database connection.',
    });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'category',
      'name slug'
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Public
export const createPost = async (req, res) => {
  try {
    // Verify category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Handle file upload - if file is uploaded, use its path; otherwise use URL from body
    const postData = { ...req.body };
    if (req.file) {
      // Construct the URL for the uploaded file
      postData.featuredImage = `/uploads/${req.file.filename}`;
    } else if (req.body.featuredImage && req.body.featuredImage.trim() !== '') {
      // Use URL if provided
      postData.featuredImage = req.body.featuredImage;
    } else {
      postData.featuredImage = '';
    }

    const post = await Post.create(postData);
    const populatedPost = await Post.findById(post._id).populate(
      'category',
      'name slug'
    );

    res.status(201).json({
      success: true,
      data: populatedPost,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Public
export const updatePost = async (req, res) => {
  try {
    // If category is being updated, verify it exists
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Category not found',
        });
      }
    }

    // Handle file upload - if file is uploaded, use its path; otherwise use URL from body
    const updateData = { ...req.body };
    if (req.file) {
      // Construct the URL for the uploaded file
      updateData.featuredImage = `/uploads/${req.file.filename}`;
    } else if (req.body.featuredImage !== undefined) {
      // Use URL if provided, or empty string if explicitly set
      updateData.featuredImage = req.body.featuredImage || '';
    }
    // If featuredImage is not in body and no file uploaded, don't update it

    const post = await Post.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate('category', 'name slug');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((err) => err.message)
          .join(', '),
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Public
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

