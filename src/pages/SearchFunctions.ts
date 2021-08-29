  
  /**
   * @var trie which contains all movie names in trie format.
   * @var suggestions which contains all movie suggestions for a particular string.
   * Each trie node will have isLeaf and children which is a trie node itself.
   * @var isLeaf will be true if it is end of a string or if it is a valid movie name.
   * @var children is a trie in itself.
   * 
   * @todo Check if it is feasible to save the top N suggestion that are possible from a node. how to handle insertion of new data and how suggestion at each node should be updated.
   */
  export class Trie {
    trie:any;
    suggestions:any[];
    constructor() {
      this.trie = null;
      this.suggestions = [];
    }
  
    newNode() {
      return {
        isLeaf: false,
        children: {}
      }
    }
  
    add(word:string) {
      if (!this.trie) this.trie = this.newNode();
  
      let root = this.trie;
      for (const letter of word) {
        if (!(letter in root.children)) {
          root.children[letter] = this.newNode();
        }
        root = root.children[letter];
      }
      root.isLeaf = true;
    }
  
    find(word:string) {
      let root = this.trie;
      for (const letter of word) {
        if (letter in root.children) {
          root = root.children[letter];
        } else {
          return null;
        }
      }
  
      return root;
    }
  
    traverse(root:any, word:string) {
      if (root.isLeaf) {
        this.suggestions.push(word);
        if(Object.keys(root.children).length===0) return;

      }
  
      for (const letter in root.children) {
        this.traverse(root.children[letter], word + letter);
      }
    }
  
    complete(word:string) {
      if(word==="") return this.suggestions;// cannot suggest anything
      const root = this.find(word);
      if (!root) return this.suggestions; // cannot suggest anything
      if (root.isLeaf) {                 // if root is leaf add to suggestion
        this.suggestions.push(word);
      }
      //now traverse the child of root and add suggestions
      const children = root.children;
  
  
      for (const letter in children) {
        this.traverse(children[letter], word + letter);
      }
  
      return this.suggestions;
    }
  
    clear() {
      this.suggestions = [];
    }
  
    print() {
      console.log(this.trie);
    }
  }

  /***** Using binary search approach.*****/
// export const findFirstOccurance = (searchQuery: string, data: string[]) => {
//     let low = 0;
//     let high = data.length - 1;
//     let searchQueryLength = searchQuery.length;
//     searchQuery = searchQuery.toLocaleLowerCase();
//     while (low <= high) {
//       let mid = Math.floor((low + high) / 2);
//       const currentMid = data[mid]
//         .slice(0, searchQueryLength)
//         .toLocaleLowerCase();
//       if (currentMid === searchQuery) {
//         return mid;
//       }
//       if (currentMid.localeCompare(searchQuery) !== -1) {
//         high = mid - 1;
//       } else {
//         low = mid + 1;
//       }
//     }
//     return -1;
//   };
//   export const getSuggestion = (searchQuery: string, data: string[]) => {
//     if(!searchQuery) return []
//     searchQuery = searchQuery.toLocaleLowerCase();
//     let firstIndex = findFirstOccurance(searchQuery, data);
//     const suggestionVal:string[] = [];
//     if (firstIndex >= 0) {
//       suggestionVal.push(data[firstIndex]);
//       const maxIndex = Math.min(firstIndex + 6, data.length);
//       for (let i = firstIndex + 1; i < maxIndex; i++) {
//         const current = data[i].toLocaleLowerCase();
//         if (current.startsWith(searchQuery)) {
//           suggestionVal.push(data[i]);
//         } else {
//           break;
//         }
//       }
//     }
//     return suggestionVal
//   };

