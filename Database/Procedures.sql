-----------------------TERMINAL------------------------
-------------------------------------------------------
CREATE PROC LOGIN
AS
	SELECT Username, Password FROM Users 
	WHERE Id IN(
		SELECT Worker_Id FROM Workers 
		WHERE Rank = 'Cashier' or 
			Rank = 'Branch Manager' or 
			Rank = 'Warehouse Manager')
GO

CREATE PROC ProductModel 
AS
	SELECT Barcode, Cost_Price, Selling_Price, Supplier_Name, Name, Category_Name, Branch_name, Count
	FROM Products as P join Products_in_Branches as PiB on P.Barcode = PiB.Product_code 
GO

CREATE PROC UP
	@Product_code char(14),
	@Branch_name varchar(50),
	@Count int
AS
	Update Products_in_Branches SET
	Count = Count - @Count
	WHERE TRIM(Product_code) = @Product_code and Branch_name = @Branch_name
GO

CREATE PROC GetCashier
	@Username varchar(50) = null
AS
	SELECT Worker_Id, W.Name, W.Rank, U.Email
	FROM Users AS U join Workers AS W on U.Id = W.Worker_Id
	Where Username = isnull(@Username,Username) and 
		(Rank = 'Cashier' or Rank = 'Branch Manager' or Rank = 'Warehouse Manager')
GO

---------------------------------------------------------------------
-------------------------PRODUCT MANAGEMENT--------------------------
---------------------------------------------------------------------


CREATE PROC SearchInBranch
	@Barcode char(14) = null,
	@Name varchar(50) = null,
	@Category_Name varchar(50) = null,
	@Supplier_Name varchar(50) = null 
AS
	SELECT Barcode,Cost_Price,Selling_Price,Supplier_Name,Name,Category_Name,Branch_name,Count 
	FROM Products AS P join Products_in_Branches as pib on P.Barcode = Pib.Product_code
	WHERE
		Trim(Barcode) = isnull(@Barcode, Barcode) and
		Trim(Name) = isnull(@Name, Name) and
		Trim(Category_Name) = isnull(@Category_Name, Category_Name) and
		Trim(Supplier_Name) = isnull(@Supplier_Name, Supplier_Name)
GO

CREATE PROC SearchInWarehouse
	@Barcode char(14) = null,
	@Name varchar(50) = null,
	@Category_Name varchar(50) = null,
	@Supplier_Name varchar(50) = null 
AS
	SELECT Barcode,Cost_Price,Selling_Price,Supplier_Name,Name,Category_Name,Warehouse_name,Quantity 
	FROM Products AS P join Products_input_date as pid on P.Barcode = Pid.Product_code
	WHERE
		Barcode = isnull(@Barcode, Barcode) and
		Name = isnull(@Name, Name) and
		Category_Name = isnull(@Category_Name, Category_Name) and
		Supplier_Name = isnull(@Supplier_Name, Supplier_Name)
GO