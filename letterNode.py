# redaction cheminement de penser : 
# j'ai hésité entre 
# 1) une variable de fin de mot , 
# 2) un charactere collé en str(ex:"A\0")
# 3) un autre noeud "\0", 
# j'ai opté pour la 3eme option car je trouve plus propre mais surement moins opti 
# idée : creer un seul noeud fin de mot pour que chaque fin de mot pointe sur lui 

class LetterNode:
    def __init__(self,letter='\0'):
        self.letter : str = letter
        self.nextLetters : dict[str:LetterNode] = {}
        self.nbPossibleWords : int = 0

    def searchNext(self,letter):
        return self.nextLetters.get(letter)

    def _countNbWords(self):
        nb = 0
        if self.letter == "\0":
            nb = 1
        else:
            for key in self.nextLetters.keys():
                nb += self.nextLetters.get(key).get_nbPossibleWords()
        return nb

    def get_nbPossibleWords(self):
        if self.nbPossibleWords == 0:
            self.nbPossibleWords = self._countNbWords()
        return self.nbPossibleWords
    
    def addNextLetter(self,letter:str):
        if not (self.searchNext(letter)):
            self.nextLetters[letter] = LetterNode(letter)
