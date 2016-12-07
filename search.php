<?php
    
$button = $_GET ['submit'];
$search = $_GET ['search']; 
  
if(strlen($search)<=1)
echo "Search term too short";
else{
echo "You searched for <b>$Search</b> <hr size='1'></br>";
mysql_connect("localhost","root","");
mysql_select_db("searchengine");
    
$search_exploded = explode (" ", $search); 
    
foreach($search_exploded as $search_each)
{
$x++;
if($x==1)
$construct .="title LIKE '%$search_each%'";
else
$construct .="AND title LIKE '%$search_each%'";   
}
  
$constructs ="SELECT * FROM searchengine WHERE $construct";
$run = mysql_query($constructs);
    
$foundnum = mysql_num_rows($run);
    
if ($foundnum==0)
echo "Sorry, there are no matching result for <b>$search</b>.</br></br>1. 
Try more general words. for example: If you want to search 'how to create a website'
then use general keyword like 'create' 'website'</br>2. Try different words with similar
 meaning</br>3. Please check your spelling";
else
{ 
  
echo "$foundnum results found !<p>";
  
$per_page = 1;
$start = $_GET['start'];
$max_pages = ($foundnum / $per_page);
if(!$start)
$start=0; 
$getquery = mysql_query("SELECT * FROM searchengine WHERE $construct LIMIT $start, $per_page");
  
while($runrows = mysql_fetch_assoc($getquery))
{
$title = $runrows ['title'];
$desc = $runrows ['description'];
$url = $runrows ['url'];
   
echo "
<a href='$url'><b>$title</b></a><br>
$desc<br>
<a href='$url'>$url</a><p>
";
    
}
  
echo "<center>";
$prev = $start - $per_page;
$next = $start + $per_page;
   
if (!($start<=0)) 
echo " <a href='search.php?search=$search&submit=Search+source+code&start=$prev'>Prev</a> ";    
  $i=1;
for($x=0; $x<$foundnum; $x=$x+$per_page)
{
if($start!=$x)
echo "<a href='search.php?search=$search&submit=Search+source+code&start=$x'>$i</a> ";
else
echo "<a href='search.php?search=$search&submit=Search+source+code&start=$x'><b>$i</b>";
$i++;

}

if (!($start >=$foundnum-$per_page))
echo " <a href='search.php?search=$search&submit=Search+source+code&start=$next'>Next</a> ";    
}   
echo "</center>";
}  
?>