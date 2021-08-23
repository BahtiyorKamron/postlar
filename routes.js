/*
	/categories

	[
		{ 
			categoryId: 1, 
			categoryName: 'electronics', 
			subCategories: [
				{ 
					subCategoryId: 1,
					subCategoryName: 'smart phones'
				},
				{ 
					subCategoryId: 2,
					subCategoryName: 'watches'
				},
				{ 
					subCategoryId: 3,
					subCategoryName: 'televisions'
				},
			]
		},
		{ 
			categoryId: 2, 
			categoryName: 'clothes', 
			subCategories: [
				{ 
					subCategoryId: 1,
					subCategoryName: 'boots'
				},
				{ 
					subCategoryId: 2,
					subCategoryName: 'shirts'
				},
				{ 
					subCategoryId: 3,
					subCategoryName: 'trousers'
				},
			]
		}
	]




	/subcategories

	[
		{ 
			subCategoryId: 1,
			subCategoryName: 'smart phones',
			products: [
				{
					productId: 1,
					productName: 'Redmi note 6 pro',
					model: 'redmi',
					price: '150',
					color: 'black'
				}
			]
		},
	]


	/products?categoryId=1
	/products?subCategoryId=1

	/products?model=samsung&color=red


	POST
	/categories
	categoryName

	/subcategories
	cateroryId name

	/products
	subCategoryId prodcutName price color model

*/