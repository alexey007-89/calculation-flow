Dim Dialog As Object


Sub OpenDialog
    DialogLibraries.LoadLibrary("Standard")
    Dialog = CreateUnoDialog(DialogLibraries.Standard.KoefDialog)
    Dialog.Execute()
End Sub


Sub CloseDialog
	Dialog.endExecute()
End Sub


Function Calculate(Tem as Double, Pres as Double, arrx_k as Double) As Double
	Dim i1 as Integer, i as Integer, j as Integer, k as Integer
	Dim Q as Double, F as Double, V as Double, G as Double
	Dim Kx as Double, p0m as Double, b as Double, p as Double
	Dim A0 as Double, A1 as Double, Db as Double, pr as Double
	Dim Zfactor1 as Double
	i1 = 0 
	i = 0
	j = 0
	k = 0
	Q = 0
	F = 0
	V = 0
	G = 0
	Kx = 0
	p0m = 0
	b = 0
	p = 0
	A0 = 0
	A1 = 0
	Db = 0
	pr = 0
	Zfactor1 = 0
	

	Dim arrGij(11, 11) as Double, arrEij(11, 11) as Double
	Dim arrQ(11) as Double
	arrQ = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0.69, 0, 0)
	Dim arrF(11) as Double
	arrF = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1)
	Dim arrE(11) as Double
	arrE = Array(151.318300, 244.166700, 298.118300, 337.638900, 324.068900, 370.682300, 365.599900, 402.636293, 99.737780, 241.960600, 2.610111, 26.957940)
	Dim arrG(11) as Double
	arrG = Array(0, 0.0793, 0.141239, 0.281835, 0.256692, 0.366911, 0.332267, 0.289731, 0.027815, 0.189065, 0, 0.034369)
	Dim arrK(11) as Double
	arrK = Array(0.4619255, 0.5279209, 0.5837490, 0.6341423, 0.6406937, 0.6798307, 0.6738577, 0.7175118, 0.4479153, 0.4557489, 0.3589888, 0.3514916)
	Dim matrGij
	matrGij = Array(Array(1, 1, 1, 1 ,1, 1, 1, 1, 1, 0.807653, 1, 1.95731), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 0.370296, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 0.982746, 1, 1), Array(0.807653, 0.370296, 1, 1, 1, 1, 1, 1, 0.982746, 1, 1, 1), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1.95731, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1))
	Dim matrEij
	matrEij = Array(Array(1, 1, 0.994635, 0.989844, 1.01953, 0.999268, 1.00235, 1.107274, 0.97164, 0.960644, 1, 1.17052), Array(1, 1, 1.02256, 1.01306, 1, 1.00532, 1, 1, 0.97012, 0.925053, 1, 1.16446), Array(0.994635, 1.02256, 1, 1.0049, 1, 1, 1, 1, 0.945939, 0.960237, 1, 1.034787), Array(0.989844, 1.01306, 1.0049, 1, 1, 1, 1, 1, 0.973384, 0.897362, 1, 1.3), Array(1.01953, 1, 1, 1, 1, 1, 1, 1, 0.946914, 0.906849, 1, 1.3), Array(0.999268, 1.00532, 1, 1, 1, 1, 1, 1, 0.94552, 0.859764, 1, 1), Array(1.00235, 1, 1, 1, 1, 1, 1, 1, 0.95934, 0.726255, 1, 1), Array(1.107274, 1, 1, 1, 1, 1, 1, 1, 1, 0.855134, 1, 1), Array(0.97164, 0.97012, 0.945939, 0.973384, 0.946914, 0.94552, 0.95934, 1, 1, 1.02274, 1, 1.08632), Array(0.960644, 0.925053, 0.960237, 0.897362, 0.906849, 0.859764, 0.726255, 0.855134, 1.02274, 1, 1, 1.28179), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1), Array(1.17052, 1.16446, 1.034787, 1.3, 1.3, 1, 1, 1, 1.08632, 1.28179, 1, 1))
	Dim matrKij
	matrKij = Array(Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(1.007619, 0.986893, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(0.997596, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0), Array(1.002529, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0), Array(1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0), Array(0.982962, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0), Array(1.00363, 1.00796, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0), Array(0.995933, 1.00851, 1, 1, 1, 1, 1, 0.910183, 0.982361, 0, 0, 0), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0), Array(1.02326, 1.02034, 1, 1, 1, 1, 1, 1, 1.03227, 1, 1, 0))
	Dim matrVij
	matrVij = Array(Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(0.990877, 1.065173, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(0.992291, 1.25, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0), Array(1, 1.25, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0), Array(1.00367, 1.25, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0), Array(1, 1.25, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0), Array(1.302576, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0), Array(0.886106, 0.816431, 0.915502, 0.993556, 1, 1, 1, 1, 0, 0, 0, 0), Array(0.963827, 0.96987, 1, 1, 1, 1, 1, 1.066638, 0.835058, 0, 0, 0), Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0), Array(1.15639, 1.61666, 1, 1, 1, 1, 1, 1, 0.408838, 1, 1, 0))
	Dim arrBrn(57) as Double, arrCrn(57) as Double, arrDrn(57) as Double, arrUrn(57) as Double
	Dim arrA0(57) as Double, arrA1(57) as Double
	Dim arrBrnij(11, 11) as Double
	Dim arrgn(57) as Double
	arrgn = Array(0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0)
	Dim arrqn(57) as Double
	arrqn = Array(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1)
	Dim arrfn(57) as Double
	arrfn = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	Dim arrS(11) as Double
	arrS = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	Dim arrsn(57) as Double
	arrsn = Array(0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	Dim arrW(11) as Double
	arrW = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	Dim arrWn(57) as Double
	arrWn = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
	Dim arrun(57) as Double
	arrun = Array(0, 0.5, 1, 3.5, -0.5, 4.5, 0.5, 7.5, 9.5, 6, 12, 12.5, -6, 2, 3, 2, 2, 11, -0.5, 0.5, 0, 4, 6, 21, 23, 22, -1, -0.5, 7, -1, 6, 4, 1, 9, -13, 21, 8, -0.5, 0, 2, 7, 9, 22, 23, 1, 9, 3, 8, 23, 1.5, 5, -0.5, 4, 7, 3, 0, 1, 0)
	Dim arran(57) as Double
	arran = Array(0.1538326, 1.341953, -2.998583, -0.04831228, 0.3757965, -1.589575, -0.05358847, 0.88659463, -0.71023704, -1.471722, 1.32185035, -0.78665925, 0.00000000229129, 0.1576724, -0.4363864, -0.04408159, -0.003433888, 0.03205905, 0.02487355, 0.07332279, -0.001600573, 0.6424706, -0.4162601, -0.06689957, 0.2791795, -0.6966051, -0.002860589, -0.008098836, 3.150547, 0.007224479, -0.7057529, 0.5349792, -0.07931491, -1.418465, -5.99905E-17, 0.1058402, 0.03431729, -0.007022847, 0.02495587, 0.04296818, 0.7465453, -0.2919613, 7.294616, -9.936757, -0.005399808, -0.2432567, 0.04987016, 0.003733797, 1.874951, 0.002168144, -0.6587164, 0.000205518, 0.009776195, -0.02048708, 0.01557322, 0.006862415,-0.001226752, 0.002850908)
	Dim arrbn(57) as Double
	arrbn = Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 7, 7, 8, 8, 8, 9, 9)
	Dim arrcn(57) as Double
	arrcn = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1)
	Dim arrkn(57) as Double
	arrkn = Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 4, 4, 0, 0, 2, 2, 2, 4, 4, 4, 4, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 0, 0, 2, 2, 2, 4, 4, 0, 2, 2, 4, 4, 0, 2, 0, 2, 1, 2, 2, 2, 2)
	
	for i = 0 to 11
		Q = Q + arrx_k(i) * arrQ(i)
		F = F + (arrx_k(i) * arrx_k(i)) * arrF(i)
        V = V + (arrx_k(i) * arrE(i) ^ 2.5)
        G = G + arrx_k(i) * arrG(i)
        Kx = Kx + arrx_k(i) * arrK(i) ^ 2.5

        for j = 0 to 11
            arrGij(i, j) = matrGij(i)(j) * (arrG(i) + arrG(j)) / 2
            arrEij(i, j) = matrEij(i)(j) * (arrE(i) * arrE(j)) ^ 0.5
		next j
	next i
	
	V = V ^ 2
	Kx = Kx ^ 2
	
	for i = 0 to 10
    	for j = i+1 to 11
            Kx = Kx + 2 * (arrx_k(i) * arrx_k(j) * (matrKij(j)(i) ^ 5 - 1) * (arrK(j) * arrK(i)) ^ 2.5)
            V = V + 2 * (arrx_k(j) * arrx_k(i) * (matrVij(j)(i) ^ 5 - 1) * (arrE(j) * arrE(i)) ^ 2.5)
            G = G + arrx_k(i) * arrx_k(j) * (matrGij(j)(i) - 1) * (arrG(j) + arrG(i))
        next j
    next i
    
    Kx = Kx ^ 0.2
    V = V ^ 0.2
    
    p0m = 0.001 * 8.31451 * 1 / Kx ^ 3
    b = 1000 * Pres * Kx ^ 3 / (8.31451 * Tem)
    p = Pres / p0m
    
	
    for i1 = 0 to 57
    	arrBrn(i1) = 0
        for i = 0 to 11
            for j = 0 to 11
                arrBrnij(i, j) = 0
                arrBrnij(i, j) = (arrGij(i, j) + 1 - arrgn(i1)) ^ arrgn(i1) * (arrQ(i) * arrQ(j) + 1 - arrqn(i1)) ^ arrqn(i1) * ((arrF(i) * arrF(j)) ^ 0.5 + 1 - arrfn(i1)) ^ arrfn(i1) * (arrS(i) * arrS(j) + 1 - arrsn(i1)) ^ arrsn(i1) * (arrW(i) * arrW(j) + 1 - arrwn(i1)) ^ arrwn(i1)
                arrBrn(i1) = arrBrn(i1) + arrx_k(i) * arrx_k(j) * arrBrnij(i, j) * arrEij(i, j) ^ arrun(i1) * (arrK(i) * arrK(j)) ^ 1.5
            next j
		next i
		arrCrn(i1) = (G + 1 - arrgn(i1)) ^ arrgn(i1) * (Q ^ 2 + 1 - arrqn(i1)) ^ arrqn(i1) * (F + 1 - arrfn(i1)) ^ arrfn(i1) * V ^ arrun(i1)
		If i1 >= 0 And i1 < 12 then
			arrDrn(i1) = arrBrn(i1) / Kx ^ 3
        	arrUrn(i1) = 0
   		ElseIf i1 >= 12 and i1 < 18 then
    		arrDrn(i1) = arrBrn(i1) / Kx ^ 3 - arrCrn(i1)
        	arrUrn(i1) = arrCrn(i1)
    	ElseIf i1 >= 18 and i1 <= 57 then
			arrDrn(i1) = 0
        	arrUrn(i1) = arrCrn(i1)
		End If
	next i1
	

	
	Do while (Abs((pr - p) / p) >= 0.00000000000001)
		A0 = 0
        A1 = 0
        b = b + Db
		for i1 = 0 to 57 
			arrA0(i1) = arran(i1) * b ^ arrbn(i1) * Tem ^ (-arrun(i1)) * (arrbn(i1) * arrDrn(i1) + (arrbn(i1) - arrcn(i1) * arrkn(i1) * b ^ arrkn(i1)) * arrUrn(i1) * Exp((-arrcn(i1)) * b ^ arrkn(i1)))
			A0 = A0 + arrA0(i1)
			arrA1(i1) = arran(i1) * b ^ arrbn(i1) * Tem ^ (-arrun(i1)) * ((arrbn(i1) + 1) * arrbn(i1) * arrDrn(i1) + ((arrbn(i1) - arrcn(i1) * arrkn(i1) * b ^ arrkn(i1)) * (arrbn(i1) - arrcn(i1) * arrkn(i1) * b ^ arrkn(i1) + 1) - arrcn(i1) * arrkn(i1) ^ 2 * b ^ arrkn(i1)) * arrUrn(i1) * Exp((-arrcn(i1)) * b ^ arrkn(i1)))
			A1 = A1 + arrA1(i1)
		next i1
		pr = b * Tem * (1 + A0)
		Db = (p / Tem - (1 + A0) * b) / (1 + A1)
		k = k + 1
	Loop
	Zfactor1 = 1 + A0
	Calculate = Format(Zfactor1, "0.0000")
End Function


Sub Test
	Dim Result as Double
	Dim Value1 as Double
	Dim Value2 as Double
	Value1 = Dialog.getControl("NumericField1").Value
	Value2 = Dialog.getControl("NumericField2").Value
	Set Radio1 = Dialog.getControl("OptionButton1").getModel()
    Set Radio2 = Dialog.getControl("OptionButton2").getModel()
    Set Radio3 = Dialog.getControl("OptionButton3").getModel()
    Dim Array(11) as Double
    Dim i as Integer

    If Radio1.State = 1 Then
        for i = 0 to 11
        	Array(i) = ThisComponent.Sheets.getByName("Исх_данные").getCellByPosition(6, 14+i).Value
        next i
    ElseIf Radio2.State = 1 Then
        for i = 0 to 11
        	Array(i) = ThisComponent.Sheets.getByName("Исх_данные").getCellByPosition(7, 14+i).Value
        next i
    Else
        for i = 0 to 11
        	Array(i) = ThisComponent.Sheets.getByName("Исх_данные").getCellByPosition(8, 14+i).Value
        next i
    End If
	
	If Dialog.getControl("NumericField1").getText = "" Or Dialog.getControl("NumericField2").getText = "" Then
		MsgBox "Допустимые значения Давления, МПа: 0...13. Допустимые значения Температуры, К: 260...350."
	Else
		Result = Calculate(Value1, Value2, Array)
		Dialog.getControl("TextField3").setText(Result)
	End If
End Sub

Sub ChangeCell
	Dim Result as Double
	Dim Value1 as Double
	Dim Value2 as Double
	Value1 = Dialog.getControl("NumericField1").Value
	Value2 = Dialog.getControl("NumericField2").Value
	Set Radio1 = Dialog.getControl("OptionButton1").getModel()
    Set Radio2 = Dialog.getControl("OptionButton2").getModel()
    Set Radio3 = Dialog.getControl("OptionButton3").getModel()
    Dim Array(11) as Double
    Dim i as Integer
    If Radio1.State = 1 Then
        for i = 0 to 11
        	Array(i) = ThisComponent.Sheets.getByName("Исх_данные").getCellByPosition(6, 14+i).Value
        next i
    ElseIf Radio2.State = 1 Then
        for i = 0 to 11
        	Array(i) = ThisComponent.Sheets.getByName("Исх_данные").getCellByPosition(7, 14+i).Value
        next i
    Else
        for i = 0 to 11
        	Array(i) = ThisComponent.Sheets.getByName("Исх_данные").getCellByPosition(8, 14+i).Value
        next i
    End If
	
	If Dialog.getControl("NumericField1").getText = "" Or Dialog.getControl("NumericField2").getText = "" Then
		MsgBox "Допустимые значения Давления, МПа: 0...13. Допустимые значения Температуры, К: 260...350"
	Else
		Result = Calculate(Value1, Value2, Array)
		Dim Cell as object
		Cell = ThisComponent.getCurrentSelection()
		If Cell.supportsService("com.sun.star.sheet.SheetCell") Then
			If Cell.CellProtection.IsLocked Then
				MsgBox "Ячейка заблокирована для изменений"
			Else
				Cell.setString(Result)
				Cell.HoriJustify = com.sun.star.table.CellHoriJustify.RIGHT
				CloseDialog
			EndIf
		Else 
			MsgBox "Сначала выберите ячейку, кликнув по ней"
		EndIf
	End If
End Sub
