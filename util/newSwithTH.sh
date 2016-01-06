../getTFPart.sh 30 e81 | xmllint --format - | grep name | cut -d\" -f2 | while read x; do ../getAllFromCol.sh $x colors 10; done
