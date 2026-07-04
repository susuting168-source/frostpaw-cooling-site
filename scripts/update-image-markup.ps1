param(
  [string]$SiteDirectory = (Join-Path $PSScriptRoot "..")
)

Add-Type -AssemblyName System.Drawing
$utf8 = New-Object System.Text.UTF8Encoding($false)

$convertedNames = @(
  "product-gel-ice-clean",
  "product-gel-ice-main",
  "product-ice-silk-bed-detail",
  "product-ice-silk-bed-main",
  "product-pet-ice-main",
  "product-pet-ice-performance",
  "product-soft-latex-layer",
  "product-soft-latex-main",
  "product-summer-pad-layer",
  "product-summer-pad-main"
)

Get-ChildItem $SiteDirectory -Recurse -Filter "*.html" | ForEach-Object {
  $file = $_
  $html = [System.IO.File]::ReadAllText($file.FullName)

  foreach ($name in $convertedNames) {
    $html = $html.Replace("$name.png", "$name.jpg")
  }

  $script:contentImageIndex = 0
  $html = [regex]::Replace($html, '<img\b[^>]*>', {
    param($match)
    $tag = $match.Value
    $srcMatch = [regex]::Match($tag, 'src=["'']([^"'']+)["'']', 'IgnoreCase')
    if (-not $srcMatch.Success) { return $tag }

    $src = $srcMatch.Groups[1].Value
    if ($src -match '\.svg(?:$|\?)') { return $tag }

    $path = Join-Path $file.DirectoryName $src
    if (-not (Test-Path $path)) { return $tag }

    $image = [System.Drawing.Image]::FromFile($path)
    try {
      $width = $image.Width
      $height = $image.Height
    } finally {
      $image.Dispose()
    }

    $tag = [regex]::Replace($tag, '\s+(width|height|loading|decoding|fetchpriority)=["''][^"'']*["'']', '', 'IgnoreCase')
    $tag = $tag -replace '\s*/?>$', " width=`"$width`" height=`"$height`" decoding=`"async`">"

    $isFirstContentImage = $script:contentImageIndex -eq 0
    $script:contentImageIndex++
    if ($isFirstContentImage) {
      return $tag -replace '>$', ' fetchpriority="high">'
    }
    return $tag -replace '>$', ' loading="lazy">'
  }, 'IgnoreCase')

  [System.IO.File]::WriteAllText($file.FullName, $html, $utf8)
}

Write-Host "Image markup update complete."
