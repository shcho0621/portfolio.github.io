[console]::InputEncoding = [console]::OutputEncoding = New-Object System.Text.UTF8Encoding
$pdfPath = "c:\workspace\portfolio3\구애의 시간.pdf"
$htmlPath = "c:\workspace\portfolio3\project_category1_1.html"

# Read PDF as binary
$pdfBytes = [IO.File]::ReadAllBytes($pdfPath)
$base64String = [Convert]::ToBase64String($pdfBytes)
$dataUri = "data:application/octet-stream;base64," + $base64String

# Read HTML Content
$htmlContent = [IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Replace the exact href string
$htmlContent = $htmlContent.Replace('href="구애의 시간.pdf"', 'href="' + $dataUri + '"')

# Save updated HTML
[IO.File]::WriteAllText($htmlPath, $htmlContent, [System.Text.Encoding]::UTF8)
Write-Output "Injected properly"
