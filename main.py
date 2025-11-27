#chatgpt -------------------------------------
def read_words_from_file(filename):
    words = []
    try:
        with open(filename, 'r') as file:
            for line in file:
                # Remove whitespace and convert to uppercase
                word = line.strip().upper()
                if word:
                    words.append(word)
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.")
    except Exception as e:
        print(f"Error reading file: {e}")
    return words

word_database = read_words_from_file('Fr_Simple.txt')
#---------------------------------------------------------------


def selectWordsWho(source,start='',n=5) -> list[str]: # nom de fonction à changer
    '''
    renvoie tous les mots d'une liste de mot @source qui commencent par le préfixe @start et ont une longueur maximale @n
    Entry:
        source (list<str>): liste de mots 
        start (str):préfixe à rechercher (par défaut '')
        n (int): longueur maximale des mots (par défaut 5)
        
    Returns:
        list<str>: Liste de mots
    '''
    words=[]
    for i in range(len(source)):
        mot = source[i]
        start = start.strip().upper()
        if len(mot) <= n:
            if sameStart(start,mot):
                words.append(mot)
    return words

def sameStart(start,word) -> bool :
    """
    Vérifie si parmis 2 mots, le mot le plus court est préfixe de l'autre.
    Entry:
        start (str): mot1.
        word (str): mot2.
    Returns:
        bool
    """


    if start != '':
        lenght = len(start) if len(start) <= len(word) else len(word)
        for i in range(lenght):
            if start[i] != word[i]:
                return False
    return True

def writeIn(grid,word,line = 0 ,start = 0)->list[list[str]]:
    """
    Ecrit un mot dans la grille à la ligne et à la colonne spécifié.
    Entry:
        grid (list<list<str>>): matrice représentant la grille.
        word (str): mot à insérer
        line (int): indice de la ligne où commencer(par défaut 0).
        start (int): indice de la colonne où commencer(par défaut 0).

    Return:
        list<list<str>>: la grille modifiée.
    """
    word = word.strip().upper()
    for i in range(len(word)):
        grid[line][start+i] = word[i]
    return grid

def getColumnWord(grid,index) -> str: #doc à enlever ici 
    """
    ff je chatgpt mtn 
    Récupère les mots d'une colonne spécifique dans la grille.
    Entry:
        grid (list<list<str>>): matrice représentant la grille.
        index (int): indice de la colonne à extraire.
        
    Returns:
        str: Une chaîne de caractères représentant les mots de la colonne.
    """
    w = ""
    for i in range(len(grid)):
        if grid[i][index] != '':
            w += grid[i][index]
    return w

def getStatNiemeLetter(words,n) -> dict : # structure de donné à revoir dans le futur
    """
    Récupère la n-ième lettre de chaque mot dans la liste.
    Entry:
        words (list<str>): liste de mots.
        n (int): indice de la lettre à récupérer.
        
    Returns:
        dict: Un dictionnaire avec les lettres comme clés et leur fréquence comme valeurs.
    """
    dic={}
    for word in words:
        dic[word[n]] = dic.get(word[n],0) + 1
    return sorted(dic.items(), key=lambda x: x[1], reverse=True)

# Objectif: trouver un algo naif qui fonctionne 

##################################################################
##################################################################
########## Code à refaire dans une classe ou autre ###############
################################################################## 
#

##### init ######

N = 4
grid = [['' for _ in range(N)] for _ in range(N)]
columnWordsData = [word_database for _ in range(N)]
statWord = [{} for _ in range(N)]
LINE = 0 ## juste pour voir visuelement avt de faire une boucle 

new_grid = writeIn(grid,"Test") # init avec un mot au hasard
LINE+=1

#### début algo ########
#### ligne 1 ####
for i in range(len(new_grid)): # pour chaque colonne
    Data = columnWordsData[i]
    newData = selectWordsWho(Data,getColumnWord(new_grid,i),N) # on recupere la liste de mot possible
    columnWordsData[i] = newData
    
    statWord[i] = getStatNiemeLetter(newData,1) # puis on regarde les stat de la 2eme lettre 
    print(f"Column {i} proba (letter,count): {statWord[i]}")  

#ensuite avec les stats on build un mot , pour ça:
# etape 1(findwords) faut recup tout les mot possible avec les lettre qu'on a 
# etape 2 (à faire) on choisi le mot qui a le meilleur score , on calcule le score d'un mot avec le count dans statWord, 
# on additione les points des lettres pour avoir le score du mot

# def findword(T,start="",i=0):
#     T = list(T)
#     words=[]
#     if start in word_database:
#         words.append(start)
#     if len(T):
#         letters=T.pop()
#         for letter in letters:
#             words += findword(T,start+letter,i+1)
#     return words

def findword2(T):
    T = list(T)
    words=[]
    for i in columnStat:
        columnStat = statWord[i]


    #test= [[x[0] for x in L ]for L in statWord]
    # print(findword2(test)) # faut opti bcp -- j'ai déja une strat dans ma tête 

# je ne sais pas encore comment gerer les cases vides, 
# pour l'instant je me dis on en place un quand il n'y aura pas de mot possible dans findwords , mais ou placer la case vide ?
# je penses à la colonne qui a le moins de mot possible 

if __name__ == "__main__":
    print("\0" == "" )