param([string]$version)

<#
    Creates nuget package for exjs
#>

function Get-ScriptDirectory
{
  $Invocation = (Get-Variable MyInvocation -Scope 1).Value
  Split-Path $Invocation.MyCommand.Path
}
$root = Get-ScriptDirectory

# Update version in nuspec file
$specfile = $root + "\exjs.nuspec"
[xml]$specxml = New-Object System.Xml.XmlDocument
$specxml.PreserveWhitespace = $true
$specxml.Load($specfile)
$specxml.package.metadata.version = $version
Set-Content $specfile $specxml.OuterXml

New-Item -ItemType Directory -Force -Path ".\nuget"

# Package
nuget pack $specfile -Version $version -OutputDirectory ".\nuget"