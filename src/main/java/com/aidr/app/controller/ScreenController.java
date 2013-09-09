package com.aidr.app.controller;

import java.util.Map;

import com.aidr.app.dto.TaggerCrisis;
import com.aidr.app.dto.TaggerCrisisExist;
import com.aidr.app.hibernateEntities.AidrCollection;
import com.aidr.app.service.CollectionService;
import com.aidr.app.service.TaggerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class ScreenController extends BaseController{

    @Autowired
    private CollectionService collectionService;
    @Autowired
    private TaggerService taggerService;

	@RequestMapping("protected/home")
	public String home(Map<String, String> model) throws Exception {
		return "home";
	}

	@RequestMapping("protected/task")
	public String task() throws Exception {
		return "task";
	}
	
	@RequestMapping("protected/master")
	public String master(Map<String, String> model) throws Exception {
		return "master";
	}
	
	@RequestMapping("protected/collection")
	public String collection(Map<String, String> model) throws Exception {
		return "collection";
	}

    @RequestMapping("protected/{code}/collection-details")
    public ModelAndView collectionDetails(@PathVariable(value="code") String code) throws Exception {
        AidrCollection collection = collectionService.findByCode(code);

        TaggerCrisisExist taggerCrisisExist = taggerService.isCrisesExist(code);
        boolean crisesExist = false;
        if (taggerCrisisExist != null && taggerCrisisExist.getCrisisId() != null && taggerCrisisExist.getCrisisId() != 0){
            crisesExist = true;
        }

        ModelAndView model = new ModelAndView("collection-details");
        model.addObject("id", collection.getId());
        model.addObject("crisesExist", crisesExist);
        return model;
    }

    @RequestMapping("protected/collection-create")
    public String collectionCreate(Map<String, String> model) throws Exception {
        return "collection-create";
    }

    @RequestMapping("protected/tagger-home")
    public String taggerHome(Map<String, String> model) throws Exception {
        return "tagger/home";
    }

    @RequestMapping("protected/{code}/tagger-collection-details")
    public ModelAndView taggerCollectionDetails(@PathVariable(value="code") String code) throws Exception {
        TaggerCrisis crisis = taggerService.getCrisesByCode(code);

        Integer crisisId = 0;
        String crisisName = "";
        Integer crisisTypeId = 0;
        if (crisis != null && crisis.getCrisisID() != null && crisis.getName() != null){
            crisisId = crisis.getCrisisID();
            crisisName = crisis.getName();
            if (crisis.getCrisisType() != null && crisis.getCrisisType().getCrisisTypeID() != null){
                crisisTypeId = crisis.getCrisisType().getCrisisTypeID();
            }
        }

        ModelAndView model = new ModelAndView("tagger/tagger-collection-details");
        model.addObject("crisisId", crisisId);
        model.addObject("name", crisisName);
        model.addObject("crisisTypeId", crisisTypeId);
        model.addObject("code", code);
        return model;
    }

    @RequestMapping("protected/{code}/predict-new-attribute")
    public ModelAndView predictNewAttribute(@PathVariable(value="code") String code) throws Exception {

        TaggerCrisis crisis = taggerService.getCrisesByCode(code);

        Integer crisisId = 0;
        String crisisName = "";
        if (crisis != null && crisis.getCrisisID() != null && crisis.getName() != null){
            crisisId = crisis.getCrisisID();
            crisisName = crisis.getName();
        }

        ModelAndView model = new ModelAndView("tagger/predict-new-attribute");
        model.addObject("crisisId", crisisId);
        model.addObject("name", crisisName);
        return model;
    }

    @RequestMapping("protected/{id}/attribute-details")
    public ModelAndView attributeDetails(@PathVariable(value="id") Integer id) throws Exception {
//        TODO check what is correct service
//        AidrCollection collection = collectionService.findByCode(id);
        ModelAndView model = new ModelAndView("tagger/attribute-details");
//        model.addObject("id", collection.getId());
        return model;
    }

    @RequestMapping("protected/{code}/{id}/model-details")
    public ModelAndView modelDetails(@PathVariable(value="code") String code, @PathVariable(value="id") Integer attributeId) throws Exception {

        TaggerCrisis crisis = taggerService.getCrisesByCode(code);

        Integer crisisId = 0;
        String crisisName = "";
        if (crisis != null && crisis.getCrisisID() != null && crisis.getName() != null){
            crisisId = crisis.getCrisisID();
            crisisName = crisis.getName();
        }

        ModelAndView model = new ModelAndView("tagger/model-details");
        model.addObject("crisisId", crisisId);
        model.addObject("crisisName", crisisName);
        return model;
    }

}
