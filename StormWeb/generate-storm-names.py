import os

f = open("./db/all.json", "w")
f.write("[")

files = os.listdir("db/")

for i in range(len(files)):
    filename = files[i]
    f.write('"' + filename.replace(".storm", "") + '"')
    if i < len(files) - 1 :
        f.write(",\n")
        
f.write("]")
f.close()
